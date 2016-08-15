
/*==============================================================*/
/* Table: AUTOS                                                 */
/*==============================================================*/
create table AUTOS (
   ID                   INT4                 not null,
   IDE_ID               VARCHAR(50)          null,
   ANOS                 VARCHAR(5)           null,
   COLOR                VARCHAR(20)          null,
   COSTO                NUMERIC              null,
   DESCRIPCION          TEXT                 null,
   FOTO                 TEXT                 null,
   MODO                 BOOL                 null,
   PAIS                 VARCHAR(50)          null,
   TITULO               VARCHAR(20)          null,
   ESTADO               CHAR(1)              null,
   constraint PK_AUTOS primary key (ID)
);

/*==============================================================*/
/* Table: IDENTIFICACION                                        */
/*==============================================================*/
create table IDENTIFICACION (
   ID                   VARCHAR(50)          not null,
   constraint PK_IDENTIFICACION primary key (ID)
);

alter table AUTOS
   add constraint FK_AUTOS_REFERENCE_IDENTIFI foreign key (IDE_ID)
      references IDENTIFICACION (ID)
      on delete restrict on update restrict;

