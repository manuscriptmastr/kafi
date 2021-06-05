# kafi

I love brewing coffee. It is so many disciplines — cuisine, art, science, therapy — rolled into a 14 minute daily routine. I love the innovation happening in the coffee industry, from crazy but wonderful drinks like espresso tonic to new processes like anaerobic fermentation to newer exporters like the Nano Challa Cooperative.

Over the COVID-19 pandemic, I began to keep a journal of my daily V60 pourover, including notes on variables like coffee origin, grind size, and pour time. It was extremely helpful and pushed my technique drastically. Still, keeping a handwritten journal for a 14-minute routine was tedious — in most cases, my grind or coffee did not change, but for the sake of clarity, I wanted to include all these variables in every journal entry.

Recently, I began following [James Hoffmann's channel](https://www.youtube.com/channel/UCMb0O2CdPBNi-QqPk5T3gsQ). Three of his videos particularly inspired me:

- [The Ultimate V60 Technique](https://www.youtube.com/watch?v=AI4ynXzkSQo). I found this video at the passionate recommendation of a barista from [Mudhouse Coffee Roasters](https://mudhouse.com/). This got me thinking more about filter coffee as a technique in of itself.
- [The Ultimate Hand Grinder Showdown](https://www.youtube.com/watch?v=dn9OuRl1F3k). I never expected a GitHub repo to show up on a YouTube video. This [coffee-related GitHub project](https://github.com/jgagneastro/coffeegrindsize) by [Jonathan Gangé](https://github.com/jgagneastro) analyzes an image of coffee grinds to determine particle size distribution.
- [The World's Largest Coffee Tasting — Live!](https://www.youtube.com/watch?v=JI7PQu-i578) What an idea — a worldwide, remote tasting! I was again struck by the innovation happening in the world of coffee and its intersection with technology. Here I was introduced to the [coffee tasting guide from Prufrock Training and Consulting](http://bit.ly/HoffmannCoffeePDF).

I was inspired to combine both the journal and tasting aspects into a CLI (command line interface) that could generate JSON entries with static validation in [Visual Studio Code](https://code.visualstudio.com/).

## Prerequisites

This project requires:

- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js, version 14 or higher](https://nodejs.org/en/)

## Quick Start

1. Fork or clone the repo.

```shell
git clone git@github.com:manuscriptmastr/kafi.git
cd kafi
```

2. Create a `.env` file using `.env.example` for reference.

3. Setup the `kafi` CLI.

```shell
# Install NPM dependencies
npm install
# Add kafi command
npm link
```

4. Create a new journal entry.

```shell
# Create a new journal entry with sane defaults
# Use the --no-open flag to prevent VS Code from opening entry
kafi journal <cupping|hybrid|pourover>
```

5. Brew your coffee, then jot out your reactions to things like:

- What does the smell remind you of?
- What does that fruity note remind you of?
- Do you _like_ what you're tasting? What part of it do you like or dislike?
- How interesting is the overall flavor? Does it change, or is it rather one-dimensional?
- How does the coffee _feel_?
- How does your mouth feel during and after a sip?

6. Use the Coffee Compass to create an action step. For instance, a coffee with a soupy body and a lack of tasting notes suggests an over-extracted brew, so next time you would make your grind coarser or decrease the overall brew time.
   ![Coffee Compass](./coffee-compass.jpg)

## CLI

### Journal

```shell
# Create and open a new journal entry
kafi journal <cupping|hybrid|pourover>
```

### Stats

```shell
$ kafi stats pourover --coffee.origin.producer Sumatra
┌─────────┬──────────────┬─────────────────────────┬───────────────────────────┬──────────────┬───────────────────┬────────┬───────┐
│ (index) │     date     │     coffee.roaster      │   coffee.origin.region    │ coffee.grind │ water.temperature │  time  │ score │
├─────────┼──────────────┼─────────────────────────┼───────────────────────────┼──────────────┼───────────────────┼────────┼───────┤
│    0    │ '05/19/2021' │ 'Madcap Coffee Company' │ 'Mount Kerinci Highlands' │      24      │      '212ºF'      │ '2:49' │   5   │
│    1    │ '05/20/2021' │ 'Madcap Coffee Company' │ 'Mount Kerinci Highlands' │      23      │      '212ºF'      │ '2:44' │   4   │
│    2    │ '05/21/2021' │ 'Madcap Coffee Company' │ 'Mount Kerinci Highlands' │      24      │      '212ºF'      │ '2:36' │   7   │
│    3    │ '05/22/2021' │ 'Madcap Coffee Company' │ 'Mount Kerinci Highlands' │      24      │      '212ºF'      │ '2:41' │   7   │
│    4    │ '05/23/2021' │ 'Madcap Coffee Company' │ 'Mount Kerinci Highlands' │      23      │      '210ºF'      │ '2:50' │   6   │
│    5    │ '05/24/2021' │ 'Madcap Coffee Company' │ 'Mount Kerinci Highlands' │      24      │      '211ºF'      │ '2:44' │   7   │
│    6    │ '05/25/2021' │ 'Madcap Coffee Company' │ 'Mount Kerinci Highlands' │      24      │      '212ºF'      │ '2:33' │   6   │
│    7    │ '05/26/2021' │ 'Madcap Coffee Company' │ 'Mount Kerinci Highlands' │     24.5     │      '212ºF'      │ '2:43' │   7   │
│    8    │ '05/27/2021' │ 'Madcap Coffee Company' │ 'Mount Kerinci Highlands' │     24.5     │      '212ºF'      │ '2:34' │   8   │
│    9    │ '05/28/2021' │ 'Madcap Coffee Company' │ 'Mount Kerinci Highlands' │      24      │      '210ºF'      │ '2:48' │   9   │
│   10    │ '05/29/2021' │ 'Madcap Coffee Company' │ 'Mount Kerinci Highlands' │      24      │      '210ºF'      │ '2:38' │   8   │
│   11    │ '05/31/2021' │ 'Madcap Coffee Company' │ 'Mount Kerinci Highlands' │      24      │      '211ºF'      │ '2:31' │   6   │
└─────────┴──────────────┴─────────────────────────┴───────────────────────────┴──────────────┴───────────────────┴────────┴───────┘
```

```shell
# Basic use
kafi stats <cupping|hybrid|pourover>
# Limit entries (defaults to last 30)
kafi stats pourover --limit 10
# Display specific fields (defaults to coffee.roaster, coffee.origin.country, coffee.grind, score)
kafi stats pourover --fields coffee.origin.region coffee.grind time
# Sort by fields (defaults to date)
kafi stats pourover --sort coffee.roaster score coffee.grind
# Filter results by properties
kafi stats pourover --equipment.grinder="Baratza Encore" --coffee.grind=23
# Merge entries on property (overrides --sort)
kafi stats pourover --merge coffee.grind --fields score
```

### Export

```shell
kafi export <from> <to> [template]
# Basic use
kafi export ./entries/01-03-2021.json ~/Desktop/entries/01-03-2021.json
# With template transform
kafi export ./entries/01-03-2021.json ~/Desktop/entries/01-03-2021.md --template ~/Desktop/my-template.md
# With date tokens. Be sure to escape spaces!
# See https://day.js.org/docs/en/display/format for accepted formats
kafi export ./entries/01-03-2021.json ~/Desktop/entries/{YYYY}/{MMMM}/{dddd},\ {MMM}\ {D},\ {YYYY}.md --template ~/Desktop/my-template.md
# Writes exported file to ~/Desktop/entries/2021/January/Sunday,\ Jan 3,\ 2021.md
```

`~/Desktop/my-template.md`:

```md
# {date}

## Coffee

- Producer: {coffee.origin.producer}
- Location: {coffee.origin.region}, {coffee.origin.country}

## Settings

- Grind: {coffee.grind} ({equipment.grinder})
- Temperature: {water.temperature}

## Results

- **Overall score: {score}/10**
  - Acidity: {acidity.quality}/5
  - Sweetness: {sweetness.quality}/5
  - Body: {body.quality}/5
  - Finish: {finish.quality}/5
- **Drawdown time: {time}**
```

`~/Desktop/01-03-2021.md`:

```md
# 01/03/2021

## Coffee

- Producer: Hernan Giron
- Location: San Vicente, Honduras

## Settings

- Grind: 24 (Comandante C40 MK3)
- Temperature: 208ºF

## Results

- **Overall score: 9/10**
  - Acidity: 4/5
  - Sweetness: 4/5
  - Body: 5/5
  - Finish: 5/5
- **Drawdown time: 3:38**
```

## Developers

To build your own journal schema:

1. Create a new JSON Schema file at `{rootDir}/src/schema/{method}.json`. Common subschemas such as `coffee.json` and `water.json` are provided.
2. Run the `build-schema` command:

```shell
# Example: npm run build-schema --type=espresso --release=1.1
npm run build-schema --type={method} --release={version}
```

## Methods

### Chemex

- [The Chemex](https://youtu.be/ikt-X5x7yoc?t=427)

### Hario V60

- [The Ultimate V60 Technique](https://www.youtube.com/watch?v=AI4ynXzkSQo)
- [Scott Rao's V60 Method](https://www.youtube.com/watch?v=c0Qe_ASxfNM)
- [Hario V60 Pour Over by Matt Perger](https://vimeo.com/46612013)
- [4:6 Method](https://www.youtube.com/watch?v=wmCW8xSWGZY)

## Resources

- [Hoffmann Coffee Calculator](https://coda.io/@alessandro-mingione/hoffmann-coffee-calculator)
- [Coffee Flavor Wheel](https://notbadcoffee.com/flavor-wheel-en/)
- [Brewing Better Coffee](https://coffeeadastra.com/2018/11/30/brewing-better-coffee/)
- [POUR OVER THEORY: How I brew](https://medium.com/@dngilb/pour-over-theory-how-i-brew-6c07aff69ca4)
- [Some Observations on Hand Pours](https://www.scottrao.com/blog/2016/10/8/some-observations-on-hand-pours)
- [Coffee Extraction and How to Taste It](https://www.baristahustle.com/blog/coffee-extraction-and-how-to-taste-it/)
