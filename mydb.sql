CREATE TABLE CALLCENTRECASES(
    id INT AUTOINCREMENT,
    name varchar(60),
    idno BIGINT,
    progno varchar(30),
    prog varchar(10),
    sex varchar(8),
    phone varchar(30),
    compsrc varchar(30),
    casecat varchar(30),
    casetype varchar(30),
    descr varchar(255),
    mood INT,
    status varchar(20),
    resolution varchar(255),
    logger varchar(60),
    mydate varchar(30),

    PRIMARY KEY (id)
)