import { Player } from "./player";

export interface Team {
    TeamID: Number,
    Key: String,
    Active: Boolean,
    City: String,
    Name: String,
    StadiumID: Number,
    League: String,
    Division: String,
    PrimaryColor: String,
    SecondaryColor: String,
    TertiaryColor: String,
    QuaternaryColor: String,
    WikipediaLogoUrl: String,
    WikipediaWordMarkUrl: String,
    GlobalTeamID:Number ,
    players: Array<Player>
}
