import { BaseEntity, Column } from 'typeorm';
import { createConnection, ConnectionManager, Connection } from "typeorm";



export class Model extends BaseEntity {
    raw: any;
    generatedMaps: any;
    id: any;

    @Column({
        name: 'created_at',
        type: 'datetime'
    })
    createdAt: Date;

    @Column({
        name: 'updated_at',
        type: 'datetime'
    })
    updatedAt: Date;

    constructor(content = null) {
        super();
        if (content !== null) {
            Object.assign(this, content);
        }
    }


    createConnection(): Promise<Connection>{
        const connectionManager = new ConnectionManager();
        return new Promise(async (resolve, reject) => {
            try{
                let connection = null;
                if (connectionManager.has('default')) {
                    connection = connectionManager.get('default');
                }else{
                    connection = await createConnection(
                        {    "type": "mysql",
                            "host": "54.207.85.105",
                            "port": 3306,
                            "username": "newsletters_user",
                            "password": "newsletters_1qazZAQ!",
                            "database": "newsletters",
                            entities: [
                                process.cwd() + "/build/Model/*.js"
                            ],
                            synchronize: true,
                            logging: false}
                    );
                }
                resolve(connection);
            }catch(e){
                reject(e);
            }
        });
    }

    generateTimeStampColumns() {
        if (typeof this.id === 'undefined') {
            this.createdAt = new Date();
            this.updatedAt = new Date();
        } else {
            this.updatedAt = new Date();
        }
    }

    save(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.createConnection().then(async connection => {
                try {
                    this.generateTimeStampColumns();
                    const entity = await connection.manager.save(this);
                    Object.assign(this, entity);
                    await connection.close();
                    resolve(this);
                } catch (err) {
                    await connection.close();
                    reject(err);
                }
            });
        });
    }

    update(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.createConnection().then(async connection => {
                try {
                    const entity = await connection.manager.update(this.constructor.name, this.id, this);
                    Object.assign(this, entity);
                    delete this.raw;
                    delete this.generatedMaps;
                    await connection.close();
                    resolve(this);
                } catch (err) {
                    await connection.close();
                    reject(err);
                }
            });
        });
    }

    find(id: number, options = {}): Promise<any> {
        return new Promise((resolve, reject) => {
            options = {...options, order: {id: "DESC" } };
            this.createConnection().then(async connection => {
                try {
                    const obj = await connection.manager.findOne(this.constructor.name, id, options);
                    Object.assign(this, obj);
                    await connection.close();
                    resolve(this);
                } catch (err) {
                    await connection.close();
                    reject(err);
                }
            });
        });
    }

    findAll(options = {}): Promise<any> {
        return new Promise((resolve, reject) => {
            options = {...options};
            this.createConnection().then(async connection => {
                try {
                    const objs = await connection.manager.find(this.constructor.name, options);
                    await connection.close();
                    resolve(objs);
                } catch (err) {
                    await connection.close();
                    reject(err);
                }

            });
        });
    }

    delete(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.createConnection().then(async connection => {
                try {
                    let obj = await connection.manager.findOne(this.constructor.name, id);
                    obj = await connection.manager.remove(obj);
                    await connection.close();
                    resolve(obj);
                } catch (err) {
                    await connection.close();
                    reject(err);
                }
            });
        });
    }

}