import { AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import Spot from "./postModel";


@Table({
    tableName: "likes",
    timestamps: false
})
export default class Like extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    id!:number;

    @ForeignKey(()=>Spot)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    spot_id!: number
}