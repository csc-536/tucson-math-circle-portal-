from mongoengine import connect


def connect_to_mongodb():
    connect(
        alias="student-db",
        host="mongodb+srv://dbtesting:9bsvzutjWZfjgaxE@cluster0.wjvcq."
        "mongodb.net/student_db?retryWrites=true&w=majority",
    )
    connect(
        alias="meeting-db",
        host="mongodb+srv://dbtesting:9bsvzutjWZfjgaxE@cluster0.wjvcq."
        "mongodb.net/meeting_db?retryWrites=true&w=majority",
    )
    connect(
        alias="users",
        host="mongodb+srv://dbtesting:9bsvzutjWZfjgaxE@cluster0.wjvcq."
        "mongodb.net/auth_db?retryWrites=true&w=majority",
    )
