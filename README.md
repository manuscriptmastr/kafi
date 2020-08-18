# Coffee Journal

I love pour over coffee. It is so many disciplines — cuisine, art, science, therapy — rolled into a 14 minute daily routine. I love the innovation happening in the coffee industry, from crazy but wonderful drinks like espresso tonic to new processes like anaerobic fermentation to newer exporters like the Nano Challa Cooperative.

Over the COVID-19 pandemic, I began to keep a journal of my daily brew, including notes on variables like coffee origin, grind size, and pour time. It was extremely helpful and pushed my technique drastically. Still, keeping a handwritten journal for a 14-minute routine was tedious — in most cases, my grind or coffee did not change, but for the sake of clarity, I wanted to include all these variables in every journal entry.

Recently, I began following [James Hoffman's channel](https://www.youtube.com/channel/UCMb0O2CdPBNi-QqPk5T3gsQ). Three of his videos particularly inspired me:
- [The Ultimate V60 Technique](https://www.youtube.com/watch?v=AI4ynXzkSQo). I found this video at the passionate recommendation of a barista from [Mudhouse Coffee Roasters](https://mudhouse.com/). This got me thinking more about filter coffee as a technique in of itself.
- [The Ultimate Hand Grinder Showdown](https://www.youtube.com/watch?v=dn9OuRl1F3k). I never expected a GitHub repo to show up on a YouTube video. This [coffee-related GitHub project](https://github.com/jgagneastro/coffeegrindsize) by [Jonathan Gangé](https://github.com/jgagneastro) analyzes an image of coffee grinds to determine particle size distribution.
- [The World's Largest Coffee Tasting — Live!](https://www.youtube.com/watch?v=JI7PQu-i578) What an idea — a worldwide, remote tasting! I was again struck by the innovation happening in the world of coffee and its intersection with technology. Here I was introduced to the [coffee tasting guide from Prufrock Training and Consulting](http://bit.ly/HoffmannCoffeePDF).

I was inspired to combine both the journal and tasting aspects into one idea. At the moment, this is simply a collection of JSON entries with a JSON Schema for static validation in [Visual Studio Code](https://code.visualstudio.com/), but in the future I hope to turn this into an app that helps users easily track and improve their daily brew.

## Setup

1. Download [Visual Studio Code](https://code.visualstudio.com/) for static [JSON Schema](https://json-schema.org/) validation.
2. Fork or clone the repo:
```bash
git clone git@github.com:manuscriptmastr/coffee-journal.git
cd coffee-journal
```
3. Empty the `./entries` folder.
4. Copy-paste contents of `./template.json` into a new journal entry `./entries/{MM}-{DD}-{YYYY}.json`.
5. Begin your brew. Hover over any property names (such as `coffee.origin.region`) for a description of the field. Write down any adjectives to capture noticeable aspects of the coffee, as well as your reaction to them. Was the body soupy like broth or thin like a cheap tea? Does your mouth feel like you've been sucking on a penny?
6. Use the Coffee Compass to create an action step. For instance, a coffee with a soupy body and a lack of tasting notes suggests an over-extracted brew, so next time you would make your grind coarser or decrease the overall pour time.
![Coffee Compass](./coffee-compass.jpg)

## Troubleshooting
- Is your drawdown suddenly taking 30–60 seconds longer for the same coffee/grind? If using a bloom swirl (aka "The Spin"), [you might be swirling too long and letting fines move to the bottom of the V60](https://www.scottrao.com/blog/2019/1/8/why-spin-the-slurry).

## Dictionary

### Acidity
The fruitiness of the coffee.

### Astringency
Dryness in the mouth, where your tongue feels sandpapery. We're used to this sensation after drinking a cheap black tea. This is a dead giveaway that you've over-extracted the coffee, either by grinding too fine or brewing too long.

### Bloom
The process when just-wet coffee releases carbon dioxide and puffs up. Allowing the coffee grounds to bloom prior to pouring helps with even, fast extraction by removing pockets of gas that otherwise would have made channels in the slurry.

### Bloom Time
The time from when water first contacts the slurry to when the slurry stops puffing up.

### Body
The texture of the coffee, also known as mouthfeel. This may range anywhere from tea-like to soupy.

### Boulders
The stone-like particles of ground coffee. These often float to the top of your brew.

### Extraction
Coffee is 30% soluble (dissolvable), but in practice only 20% is the tasty part. Extraction is the process (via pour over, drip, espresso, etc.) of temporarily contacting water with coffee to extract these parts of the coffee.

### Finish
The aftertaste of the coffee.

### Fines
The chaff-like particles of ground coffee. There will always be some, but less depending on the quality of your grinder. Ethiopian beans in particular produce more fines than other origins.

### Particle Distribution
The consistency of your coffee grounds, which significantly affects the clarity of your cup because even grounds mean most of your coffee is extracted at the same rate. A grind with many boulders and lots of fines contributes to a very noticeable sharp but muddy flavor.

### Pour Time
The time from when water first contacts the slurry in the bloom phase to when the stream of water suddenly falters to single drips.

### Slurry
The coffee grounds in your pour over.

### Sweetness
Self explanatory, but sweetness is easy to perceive in relation to acidity (fruitiness). Is the lemon note tangy/puckery, or rounded/rich like lemonade?
