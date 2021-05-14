# Dreamorganism.org

Website for [Dreamorganism](https://dreamorganism.org)


## How to run locally
### Requirements
- hugo
- go-task
- yarn (if modifying the flow animation)


### Running the development server
Run `hugo serve`. 

After Hugo is launched you can use it to preview in realtime changes to the content.

## Changing the animation on the homepage

To include changes in the website run `task ts`

Read the readme in the folder ts-assets-to-build for starting dev server.


## Writing a translation
Translations rely on three main Hugo-specific conventions:

1. The presence of the corresponding language in `config.toml`
2. The `themes/dreamorganism-original/i18n` directory, which contains translations for menu elements, and a few other miscelanneous strings.
3. In `content/`, the presence of markdown files for the specific language you're translating to.


Let's say that you're working on a Japanese translation.
The [two-letter ISO code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) for Japanese is `ja`.

Start by adding the new translation to `config.toml`:

```
DefaultContentLanguage = "en"
[languages]
  [languages.en]
    weight = 1
  [languages.it]
    weight = 2
  [languages.ja] 
    weight = 2
```

Then copy `content/_index.en.md` to `content/_index.ja.md` and apply a small change to be able to distinguish the two versions.

Start `hugo serve` (or reload it); at this point you can go in your browser to `localhost:PORT/ja/` to preview your translation.

Translate all files in `content/` that have a `.en.md` extension, and translate `themes/ziglang-original/i18n/en.toml` to translate some menu items, the downloads page, and a few other miscelanneous strings.

Finally, add your translation to `translations/index.md`.

### Getting help
Crafting a translation is not a straight-forward proceess. You have to think about adaptation, spatial constraints (in the front page especially), and other Hugo-specific issues that might not be immediately obvious.

If you don't mind instant messaging, please consider joining one of the Dreamorganism Discord communities, where you will be able to communicate with other contributors and share some knowledge.

If you prefer asynchronous communication, feel free to open a draft PR, we will make sure to engage with you pronto.

Keep in mind that it's possible that the current setup doesn't allow you correctly implement a translation without making ulterior changes to Hugo's configuration or how the content is organized. Don't hesitate to reach out for help to avoid getting stuck in a problem that can't be solved without larger-scale changes.
