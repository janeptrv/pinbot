import {
  ApplicationCommandOptionChoice,
  Channel,
  ChannelTypes,
  Guild,
  Interaction,
  Member,
  Message,
  MessageContent,
  Permission,
  User
} from "eris";
import { Context } from "../context";

export enum CommandError {
  UNREACHABLE_ERROR,
  INVALID_ARGUMENT,
  MISSING_ARGUMENT,
  USER_NOT_ON_WHITELIST,
  USER_MISSING_PERMISSIONS,
  BOT_MISSING_PERMISSIONS,
}

export function get_error_text(error: CommandError): string {
  switch (error) {
  case CommandError.UNREACHABLE_ERROR: return "UNREACHABLE (developer issue)";
  case CommandError.INVALID_ARGUMENT: return "Invalid argument";
  case CommandError.MISSING_ARGUMENT: return "Missing required argument";
  case CommandError.USER_NOT_ON_WHITELIST: return "User is not whitelisted";
  case CommandError.USER_MISSING_PERMISSIONS: return "User does not have permission";
  case CommandError.BOT_MISSING_PERMISSIONS: return "Bot does not have permission";
  default: return "Unknown error";
  }
}

export type CommandOptionType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type CommandOption = {
  name: string;
  description: string;
  type: CommandOptionType;
  required?: boolean;
  hints_to?: string;
  options?: CommandOption[];
  choices?: ApplicationCommandOptionChoice[];
  channel_types?: ChannelTypes[];
};

export enum WhitelistType {
  OWNER,
  USER,
  GUILD
}

export type CommandType = 1 | 2 | 3;
export type CommandDetails = {
  name: string;
  aliases?: string[];
  description: string;
  options?: CommandOption[];
  type: CommandType;
  whitelist?: WhitelistType;
  required_permissions?: Permission;
};

export type Mention = User | Member | Message | Channel | Guild;
export type Argument = string | number | boolean | Mention | Interaction | CommandArguments | Argument[];
export type CommandArguments = {
  create_reply: (reply: MessageContent) => Promise<Message | undefined>;
  arguments?: { [name: string]: Argument };
};

export type CommandFunction = (ctx: Context, args: CommandArguments) => void;


export interface Command {
  command_options: CommandDetails;
  command_function: CommandFunction;
  guilds?: string[];
}