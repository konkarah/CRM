CREATE TABLE CALLCENTRECASES(
    id INT AUTOINCREMENT,
    name varchar(60),
    idno BIGINT,
    prog varchar(10),
    sex varchar(8),
    phone varchar(30),
    compsrc varchar(30),
    casecat varchar(30),
    casetype varchar(30),
    desc varchar(255),
    mood INT,
    status varchar(20),
    resolution varchar(255)

    PRIMARY KEY (id)
)