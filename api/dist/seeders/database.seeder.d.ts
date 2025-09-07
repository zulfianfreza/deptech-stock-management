import { AdminSeeder } from './admin.seeder';
import { CategorySeeder } from './category.seeder';
export declare class DatabaseSeeder {
    private adminSeeder;
    private categorySeeder;
    constructor(adminSeeder: AdminSeeder, categorySeeder: CategorySeeder);
    run(): Promise<void>;
}
