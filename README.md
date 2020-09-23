# pourover-cli

I love pour over coffee. It is so many disciplines — cuisine, art, science, therapy — rolled into a 14 minute daily routine. I love the innovation happening in the coffee industry, from crazy but wonderful drinks like espresso tonic to new processes like anaerobic fermentation to newer exporters like the Nano Challa Cooperative.

Over the COVID-19 pandemic, I began to keep a journal of my daily brew, including notes on variables like coffee origin, grind size, and pour time. It was extremely helpful and pushed my technique drastically. Still, keeping a handwritten journal for a 14-minute routine was tedious — in most cases, my grind or coffee did not change, but for the sake of clarity, I wanted to include all these variables in every journal entry.

Recently, I began following [James Hoffman's channel](https://www.youtube.com/channel/UCMb0O2CdPBNi-QqPk5T3gsQ). Three of his videos particularly inspired me:
- [The Ultimate V60 Technique](https://www.youtube.com/watch?v=AI4ynXzkSQo). I found this video at the passionate recommendation of a barista from [Mudhouse Coffee Roasters](https://mudhouse.com/). This got me thinking more about filter coffee as a technique in of itself.
- [The Ultimate Hand Grinder Showdown](https://www.youtube.com/watch?v=dn9OuRl1F3k). I never expected a GitHub repo to show up on a YouTube video. This [coffee-related GitHub project](https://github.com/jgagneastro/coffeegrindsize) by [Jonathan Gangé](https://github.com/jgagneastro) analyzes an image of coffee grinds to determine particle size distribution.
- [The World's Largest Coffee Tasting — Live!](https://www.youtube.com/watch?v=JI7PQu-i578) What an idea — a worldwide, remote tasting! I was again struck by the innovation happening in the world of coffee and its intersection with technology. Here I was introduced to the [coffee tasting guide from Prufrock Training and Consulting](http://bit.ly/HoffmannCoffeePDF).

I was inspired to combine both the journal and tasting aspects into a CLI (command line interface) that could generate JSON entries with static validation in [Visual Studio Code](https://code.visualstudio.com/).

## Prerequisites

This project requires:
- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/en/)

## Quick Start

1. Fork or clone the repo.
```bash
git clone git@github.com:manuscriptmastr/pourover-cli.git
cd pourover-cli
```
2. Setup the `pourover` CLI.
```bash
# install NPM dependencies
npm install
# add pourover command
npm link
```
3. Create a new journal entry.
```bash
# create a new journal entry with sane defaults
pourover journal new
```
4. Begin your brew. Hover over any property names (such as `coffee.origin.region`) for a description of the field. Write down any adjectives to capture noticeable aspects of the coffee, as well as your reaction to them. Was the body soupy like broth or thin like a cheap tea? Does your mouth feel like you've been sucking on a penny?
5. Use the Coffee Compass to create an action step. For instance, a coffee with a soupy body and a lack of tasting notes suggests an over-extracted brew, so next time you would make your grind coarser or decrease the overall pour time.
![Coffee Compass](./coffee-compass.jpg)

## CLI

### Journal
```bash
# Create a new journal entry
pourover journal new
```

### Stats
```bash
# Basic use
pourover stats --fields grind pourTime
# Sort by field (defaults to score)
pourover stats --fields grind pourTime --sort score
# Use dot notation (available on all flags)
pourover stats --fields coffee.origin.region score
# Filter results by properties
pourover stats --fields grind pourTime --equipment.grinder="Baratza Encore" --grind=23
```

## Methods

### Chemex
- [The Chemex](https://youtu.be/ikt-X5x7yoc?t=427)

### Hario V60
- [The Ultimate V60 Technique](https://www.youtube.com/watch?v=AI4ynXzkSQo)
- [Scott Rao's V60 Method](https://www.youtube.com/watch?v=c0Qe_ASxfNM)
- [Hario V60 Pour Over by Matt Perger](https://vimeo.com/46612013)
- [4:6 Method](https://www.youtube.com/watch?v=wmCW8xSWGZY)

## FAQ

### Why keep a journal?

### MVP mindset: what products most impact quality the brew?

### How will I know what I'm aiming for taste-wise?

### What temperature should I heat the water to?

### What's the difference between a Chemex, V60, or Kalita Wave?

### What do you consider characteristics of good coffee?

## Troubleshooting

### My coffee tastes sour, weak, and thin.

### My coffee tastes overwhelming, tangy, and soupy.

### As my coffee cools, the taste disappears.

### My mouth feels dry after drinking.

### My Ethiopian roast takes longer than other roasts and sometimes stalls
