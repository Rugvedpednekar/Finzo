from sqlalchemy import Engine, inspect, text
from sqlalchemy.sql.schema import Column

from app.database import Base


def _quote(name: str) -> str:
    return f'"{name}"'


def _generic_column_sql(column: Column) -> str:
    column_type = column.type.compile()
    if column.name == "created_at":
        return f"{column.name} TIMESTAMP"
    if column.table.name == "users" and column.name == "hashed_password":
        return "hashed_password VARCHAR(255)"
    return f"{column.name} {column_type}"


def _column_sql(column: Column, engine: Engine) -> str:
    dialect_name = engine.dialect.name
    if dialect_name in {"postgresql", "postgres"}:
        if column.table.name == "users" and column.name == "hashed_password":
            return "hashed_password VARCHAR(255)"
        if column.name == "created_at":
            return f"{column.name} TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
        return f"{column.name} {column.type.compile(dialect=engine.dialect)}"
    return _generic_column_sql(column)


def run_schema_migrations(engine: Engine) -> None:
    """Add missing columns for the current SQLAlchemy models without dropping data."""
    inspector = inspect(engine)
    dialect_name = engine.dialect.name

    with engine.begin() as connection:
        for table in Base.metadata.sorted_tables:
            existing_tables = inspector.get_table_names()
            if table.name not in existing_tables:
                continue

            existing_columns = {column["name"] for column in inspector.get_columns(table.name)}
            for column in table.columns:
                if column.primary_key or column.name in existing_columns:
                    continue

                column_sql = _column_sql(column, engine)
                table_name = _quote(table.name)

                if dialect_name in {"postgresql", "postgres"}:
                    statement = f"ALTER TABLE {table_name} ADD COLUMN IF NOT EXISTS {column_sql}"
                else:
                    statement = f"ALTER TABLE {table_name} ADD COLUMN {column_sql}"

                connection.execute(text(statement))

    print("Database schema check completed.")
