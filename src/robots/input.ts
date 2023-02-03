import readline from "readline-sync";

type IType = "YouTube" | "TikTok";

export interface IUrl {
  uri: string;
  type: IType;
}

export interface Content {
  urls: IUrl[];
}

type MenuOption = "Add new URL";

export function robot() {
  const content = {
    urls: [],
  } as Content;

  const url = askAndReturnOneUrl();
  content.urls.push(url);

  const option = askAndReturnOneOption();

  if (option === "Add new URL") {
    robot();
  } else {
    return console.log("Exiting...");
  }

  function askAndReturnOneUrl(): IUrl {
    const url = readline.question("Paste url here: ");

    const types = ["YouTube", "TikTok"] as IType[];

    const typeSelectedIndex = readline.keyInSelect(
      types,
      "Choose the platform: "
    );
    const typeSelectedText = types[typeSelectedIndex];
    return {
      uri: url,
      type: typeSelectedText,
    };
  }

  function askAndReturnOneOption(): MenuOption {
    const options = ["Add new URL", "Exit"] as MenuOption[];

    const optionSelectedIndex = readline.keyInSelect(
      options,
      "choose one option: "
    );
    const optionSelectedText = options[optionSelectedIndex];

    return optionSelectedText;
  }
}
