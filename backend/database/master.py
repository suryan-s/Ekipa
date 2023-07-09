import os
import sqlite3

from dbutils.pooled_db import PooledDB

# Create a connection pool
pool = PooledDB(
    creator=sqlite3,
    database=os.path.join("backend", "database", "ekipa.db"),
    maxconnections=10
)


async def execute(mode: str, query: str, args: tuple = None) -> list | None:
    """Executes the provided query or script based on the mode.

    Args:
        mode (str): The execution mode. Should be one of 'query', 'many' or 'script'.
        query (str): The query or script to be executed.
        args (tuple, optional): The arguments to be passed to the query or script. Defaults to None.

    Returns:
        list: The result of the query, or None if executing a script.
    """
    result = None
    conn = pool.connection()
    cur = conn.cursor()

    if mode == 'query':
        if args:
            cur.execute(query, args)
        else:
            cur.execute(query)
        result = cur.fetchall()

    elif mode == 'many':
        cur.executemany(query, args)
        result = cur.fetchall()

    elif mode == 'script':
        cur.executescript(query)
        result = None

    conn.commit()
    cur.close()

    return result


async def create_tables() -> None:
    """
    Creates the tables in the database.
    :return: None
    """
    with open(os.path.join("backend", "database", "schema.sql"), "r") as f:
        result = await execute("script", f.read())


async def add_user(
        userid: str,
        username: str,
        hashed_password: str,
        email: str,
        first_name: str,
        last_name: str,
        phone: str,
        address: str,
        city: str,
        state: str,
        country: str,
        zip_code: str,
        team_name: str,
        role: int,
        skills: str
):
    """
    Adds a user to the database.
    :return:
    """
    stat = await get_userid(username)
    if stat['status'] == 'success':
        status = 409
        return status
    query = """
    INSERT INTO User (
    user_id, username, password_hash, email, first_name,
    last_name, phone_number, address, city, state,
    country, zip_code, team_name, skills, role_id
    ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
    """
    args = (userid, username, hashed_password, email, first_name,
            last_name, phone, address, city, state, country,
            zip_code, team_name, skills, role)
    try:
        result = await execute("query", query, args)
        return result
    except sqlite3.Error as e:
        print(f"The SQL statement failed with error: {e}")
        return e


async def get_password(username: str):
    """
    Gets the password of a user from the database.
    :return:
    """
    conn = pool.connection()
    cursor = conn.cursor()
    result = None
    try:
        query = "SELECT password_hash FROM User WHERE username = ?"
        arg = (username,)
        result = await execute("query", query, arg)
        conn.commit()
    except sqlite3.Error as e:
        print(f"get_password: The SQL statement failed with error: {e}")
    if result is not None:
        if len(result) > 0:
            return list(result[0])[0]
    else:
        return None


async def get_userid(username: str):
    """
    Gets the user ID of a user from the database.
    :return:
    """
    result = {'status': 'failed', 'userid': None}  # Initialize with default values
    try:
        query = """SELECT user_id FROM User WHERE username = ?"""
        args = (username,)
        rows = await execute("query", query, args)
        if rows:
            result['status'] = 'success'
            result['userid'] = rows[0][0]
    except sqlite3.Error as e:
        print(f"The SQL statement failed with error: {e}")
    return result


async def get_user_details(username: str):
    """
    Gets the user details of a user from the database.
    :return:
    """
    result = None
    try:
        query = """SELECT * FROM User WHERE username = ?"""
        args = (username,)
        result = await execute("query", query, args)
    except sqlite3.Error as e:
        print(f"The SQL statement failed with error: {e}")
        return e
    return result


async def get_all_members():
    """
    Gets all the users from the database.
    :return:
    """
    result = None
    try:
        query = """SELECT * FROM User"""
        result = await execute("query", query)
    except sqlite3.Error as e:
        print(f"The SQL statement failed with error: {e}")
        return e
    return result


async def get_all_team_members(username: str):
    """
    Gets all the users from the database.
    :return:
    """
    result = None
    try:
        query1 = """SELECT team_name FROM User WHERE user_id = ?"""
        team_name = await execute("query", query1, (username,))
        print(team_name[0][0])
        query2 = """SELECT user_id, username, first_name, last_name FROM User WHERE team_name = ? AND username != ?"""
        result = await execute("query", query2, (team_name, username))
    except sqlite3.Error as e:
        print(f"The SQL statement failed with error: {e}")
        return e
    return result


async def get_roles():
    """
    Gets the roles from the database.
    :return:
    """
    result = None
    try:
        query = """SELECT * FROM Roles"""
        result = await execute("query", query)
    except sqlite3.Error as e:
        print(f"The SQL statement failed with error: {e}")
        return e
    return result


async def get_user_role(userid: str):
    """
    Gets the role of a user from the database.
    :return:
    """
    result = None
    try:
        query = """SELECT role_id FROM User WHERE user_id = ?"""
        args = (userid,)
        result = await execute("query", query, args)
    except sqlite3.Error as e:
        print(f"The SQL statement failed with error: {e}")
        return e
    return result


async def get_all_teams():
    """
    Gets all the teams from the database.
    :return:
    """
    result = None
    try:
        query = """SELECT * FROM Team"""
        result = await execute("query", query)
    except sqlite3.Error as e:
        print(f"The SQL statement failed with error: {e}")
        return e
    return result


async def get_all_task():
    """
    Gets all the tasks from the database.
    :return:
    """
    result = None
    try:
        query = """SELECT task_id,task_name,status,task_type,task_priority FROM Task"""
        result = await execute("query", query)
    except sqlite3.Error as e:
        print(f"The SQL statement failed with error: {e}")
        return e
    return result


async def get_my_task(userid: str):
    """
    Gets all the user tasks from the database.
    :return:
    """
    result = None
    try:
        query = """SELECT * FROM Task WHERE assignee_id = ?"""
        args = (userid,)
        result = await execute("query", query, args)
    except sqlite3.Error as e:
        print(f"The SQL statement failed with error: {e}")
        return e
    return result


async def get_team_details(username: str):
    """
    Gets the team details of a team from the database.
    :return:
    """
    result = None
    try:
        query1 = """SELECT team_name FROM User WHERE user_id = ?"""
        team_name = await execute("query", query1, (username,))
        print(team_name[0][0])
        query2 = """
        SELECT
            Team.team_name AS "Team Name",
            COUNT(User.user_id) AS "Total Members",
            COUNT(CASE WHEN Task.status IN ('IN PROGRESS', 'OVERDUE') THEN 1 END) AS "Total Pending Tasks",
            COUNT(CASE WHEN Task.status = 'COMPLETED' THEN 1 END) AS "Total Completed Tasks"
        FROM
            Team
        LEFT JOIN
            User ON Team.team_name = User.team_name
        LEFT JOIN
            Task ON Team.team_id = Task.team_id
        WHERE
            Team.team_name = ?
        """
        result = await execute("query", query2, (team_name,))
    except sqlite3.Error as e:
        print(f"The SQL statement failed with error: {e}")
        return e
    return result


async def get_all_teams_details():
    """
    Gets all the teams from the database.
    :return:
    """
    result = None
    try:
        query = """
        SELECT
            Team.team_name AS "Team Name",
            COUNT(User.user_id) AS "Total Members",
            COUNT(CASE WHEN Task.status IN ('IN PROGRESS', 'OVERDUE') THEN 1 END) AS "Total Pending Tasks",
            COUNT(CASE WHEN Task.status = 'COMPLETED' THEN 1 END) AS "Total Completed Tasks"
        FROM
            Team
        LEFT JOIN
            User ON Team.team_name = User.team_name
        LEFT JOIN
            Task ON Team.team_id = Task.team_id
        GROUP BY
            Team.team_name;
        """
        result = await execute("query", query)
    except sqlite3.Error as e:
        print(f"The SQL statement failed with error: {e}")
        return e
    return result


async def get_team_id(sender_id):
    """
    Gets the team id of a team from the database using the user id.
    :return:
    """
    result = None
    try:
        query = """
        SELECT Team.team_id 
        FROM User 
        JOIN Team ON User.team_name = Team.team_name 
        WHERE User.user_id = ?;
        """
        args = (sender_id,)
        result = await execute("query", query, args)
    except sqlite3.Error as e:
        print(f"The SQL statement failed with error: {e}")
        return e
    return result


async def put_message(sender_id, incoming_message):
    """
    Inserts the message into the database.
    :return:
    """
    try:
        team_id = await get_team_id(sender_id)
        print(team_id)
        query = """INSERT INTO Chat (team_id, sender_id, message) VALUES (?, ?)"""
        args = (team_id, sender_id, incoming_message)
        await execute("query", query, args)
    except sqlite3.Error as e:
        print(f"The SQL statement failed with error: {e}")
        return e


async def get_message():
    """
    Gets all the messages from the database.
    :return:
    """
    result = None
    try:
        query = """SELECT * FROM Chat"""
        result = await execute("query", query)
    except sqlite3.Error as e:
        print(f"The SQL statement failed with error: {e}")
        return e
    return result