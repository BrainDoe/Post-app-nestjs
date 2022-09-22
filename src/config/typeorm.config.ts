import { User } from 'src/typeorm/entities/User.entity';
import { MysqlConnectionOptions} from 'typeorm/driver/mysql/MysqlConnectionOptions';

export const typeOrmConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'postsapp',
  entities: [User],
  synchronize: true
}