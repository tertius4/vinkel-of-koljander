import { Table } from "./Table";

class DBClass {
  public Resep = new Table<DB.Resep>("resep");
  public Comments = new Table<DB.Comment>("comments");
}

export const DB = new DBClass();
