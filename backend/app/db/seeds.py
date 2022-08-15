import asyncio
import random

from asyncpg.connection import Connection
from asyncpg.exceptions import UniqueViolationError
from faker import Faker
from loguru import logger

from app.main import app
from app.core.config import get_app_settings
from app.db.repositories.comments import CommentsRepository
from app.db.repositories.items import ItemsRepository
from app.db.repositories.users import UsersRepository
from app.db.events import close_db_connection, connect_to_db


SEED_USERNAME_PREFIX = "test"


async def seed_initial_users(conn: Connection, count: int) -> None:
    users_repo = UsersRepository(conn=conn)
    for i in range(count):
        username = f"{SEED_USERNAME_PREFIX}_{i:04}"
        try:
            await users_repo.create_user(
                username=username,
                email=f"{username}@example.test",
                password=f"hunter2",
            )
        except UniqueViolationError:
            logger.error(f"Username {username} already exists")
    logger.info(f"Created {count} user(s)")


async def seed_initial_items(
    conn: Connection,
    count: int,
) -> None:
    fake = Faker()

    users_repo = UsersRepository(conn=conn)
    items_repo = ItemsRepository(conn=conn)

    # Get all test users
    users = await users_repo.get_users_by_username(username=SEED_USERNAME_PREFIX)

    # Register item in DB
    for i in range(count):
        user = random.choice(users)
        try:
            await items_repo.create_item(
                slug=fake.sentence(),
                title=fake.sentence(),
                description=fake.sentence(),
                seller=user,
            )
        except UniqueViolationError:
            logger.error("Item already exists")

    logger.info(f"Created {count} item(s)")


async def seed_initial_comments(conn: Connection, count: int) -> None:
    fake = Faker()

    users_repo = UsersRepository(conn=conn)
    items_repo = ItemsRepository(conn=conn)
    comments_repo = CommentsRepository(conn=conn)

    users = await users_repo.get_users_by_username(username=SEED_USERNAME_PREFIX)
    usernames = [user.username for user in users]
    items = await items_repo.get_items_by_seller_usernames(seller_usernames=usernames)

    # Select random combination of both
    # Create random comment
    for i in range(count):
        await comments_repo.create_comment_for_item(
            body=fake.text(),
            item=random.choice(items),
            user=random.choice(users),
        )

    logger.info(f"Created {count} comment(s)")


async def main():
    settings = get_app_settings()
    await connect_to_db(app, settings=settings)
    pool = app.state.pool

    async with pool.acquire() as connection:
        await seed_initial_users(connection, 100)
        await seed_initial_items(connection, 100)
        await seed_initial_comments(connection, 100)

    await close_db_connection(app)


asyncio.get_event_loop().run_until_complete(main())
