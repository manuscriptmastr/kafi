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
4. Copy-paste contents of `./src/template.json` into a new journal entry `./entries/{MM}-{dd}-{yyyy}.json` OR if you are a Node.js developer and like to automate everything, open a command line and run:
```bash
# install NPM dependencies
npm install
# add coffee-journal command
npm link
# create a new journal entry with sane defaults
coffee-journal new
```
5. Begin your brew. Hover over any property names (such as `coffee.origin.region`) for a description of the field. Write down any adjectives to capture noticeable aspects of the coffee, as well as your reaction to them. Was the body soupy like broth or thin like a cheap tea? Does your mouth feel like you've been sucking on a penny?
6. Use the Coffee Compass to create an action step. For instance, a coffee with a soupy body and a lack of tasting notes suggests an over-extracted brew, so next time you would make your grind coarser or decrease the overall pour time.
![Coffee Compass](./coffee-compass.jpg)

## Methods
You can have a world-class grinder and the best single origin coffee beans and have wildly inconsistent brews. Inconsistent technique, all other variables equal, can add or subtract *minutes* to your drawdown. Try out some of these popular techniques to improve your brews.

**Note**: these methods are incredibly precise. If you are experiencing drastically inconsistent pour times for the same coffee/grind size/ratio/filter, double check your understanding of the method before troubleshooting other aspects of your brew.

### Chemex
- [The Chemex](https://youtu.be/ikt-X5x7yoc?t=427)

### French Press
- [The Ultimate French Press Technique](https://www.youtube.com/watch?v=st571DYYTR8)

### Hario V60
- [The Ultimate V60 Technique](https://www.youtube.com/watch?v=AI4ynXzkSQo)
- [Scott Rao's V60 Method](https://www.youtube.com/watch?v=c0Qe_ASxfNM)
- [4:6 Method](https://www.youtube.com/watch?v=wmCW8xSWGZY)

## FAQ

### MVP mindset: what factors most impact quality the brew?

1. Coffee — light to medium, single origin roasts are about as close as you can get to what coffee truly tastes like. If possible, order a pour over of the coffee you're interested in recreating so that you have an idea of what your daily coffee *should* be tasting like.
2. Method — most people are genuinely shocked when they first taste a pour over method like Chemex, V60, or Aeropress. Ironically, these kinds of methods are absurdly cheap compared to an expensive coffee machine, but are used by third wave coffee shops and in barista championships.
3. Kitchen scale — they make your brews much more consistent, and your life will be better. Seriously. Buy a cheap $10 scale that can measure grams and you're set for at least a couple years of this journey.
4. Grinder — the consistency, or **particle distribution**, of your coffee grind completely changes the taste. The best way I can describe it is the sensation of the cup getting more focused and clean vs. muddy with wacky 'off tastes'. Start with a cheaper burr grinder (less than $50) and you should be good for at least a year or two on your journey. The grinder is the single most expensive yet impactful part of coffee, so pick your battles carefully with this purchase.
5. Gooseneck kettle — you can totally do amazing pour overs with a regular kettle, but the gooseneck spout really helps with consistency.
6. Water — depending on where you live, this might be a small or huge improvement. Water is 98% of your coffee, and if your water tastes bad, your coffee will, too. There are many options for improving water for coffee, but avoid reverse osmosis if possible. It does strange things to the brew process.

### How will I know what I'm aiming for taste-wise?

If possible, buy coffee beans after you've had the coffee shop make you a pour over (try to avoid additives like sugar or milk). Take some notes on aspects like the aroma, acidity (fruitiness), sweetness, body (thickness), and finish (aftertaste), then use those as markers for your own brewing. Even better, try [cupping your coffee](https://www.youtube.com/watch?v=cSEgP4VNynQ) to get these markers.

### What temperature should I heat the water to?

TL;DR: for light to medium roasts, right off the boil. For darker roasts, play around with slightly cooler temperatures.

### What's the difference between a Chemex, V60, or Kalita Wave?

Tasting is believing. Even though all three methods are cone-shaped and use paper filters, they taste noticeably different. The Chemex filter is much, much thicker for instance than a V60 or Kalita filter. The V60 has a large hole and drainage channels, while the Chemex has no channels and the Kalita has three small holes. All these variables add up to surprisingly different tastes. If your goal is a brew you can't mess up, go for Chemex or Kalita Wave. If your goal is to master the pour over and maximize the quality of the brew, many baristas stand by the V60, even if they use a Kalita Wave or Chemex at work to reduce the chances of bad brews.

## Troubleshooting

### My coffee tastes sour, weak, and thin.

The soluble parts of coffee dissolve in stages. TL;DR: acidic flavors (e.g. tangy, fruity) extract sooner than sweetness and body (e.g. syrupy). If your coffee both makes your mouth pucker *and* feels watery in texture, then it's probably underextracted. Keep in mind a lot of us confuse sour (underextracted) and bitter (overextracted), which is why the paying attention to the body, or thickness of the brew, helps which extreme we are at.

### My coffee tastes overwhelming, tangy, and soupy.

This is likely overextraction. The dead giveaway is that the body, or **mouthfeel**, is thick like a syrup (which comes later in the brew phase) but the actual tastes (other than strong acidity) seem to be gone.

### As my coffee cools, the taste disappears.

Probably overextraction.

### My mouth feels dry after drinking.

Some of the same components in black tea are present in coffee beans, and when you overextract coffee, you'll feel a similar sensation in the mouth. It's called **astringency** and it's not a great feeling for your morning coffee.

### I've been using the Hoffman V60 method and the drawdown is suddenly taking 30–60 seconds longer, but I haven't changed my coffee, grind, or ratio.

If you are using the swirl bloom, aka "The Spin", [you might be swirling too long and letting fines move to the bottom of the V60](https://www.scottrao.com/blog/2019/1/8/why-spin-the-slurry). In my own experience, swirling the bloom for too long added up to 1:15 extra time to the drawdown! You want to swirl just long and hard enough that the slurry is evenly soaked and hardly bubbling. Any longer or harder and physics begins to do its nasty work on the fines.

### My Ethiopian roast takes longer than other roasts and sometimes stalls

Interestingly, Ethiopian roasts produce more fines than others, so it's easier to accidentally over-agitate the slurry to the point where fines move toward the filter. If it tastes well-extracted, this is not a problem; if it is stalling and tasting harsh, try grinding one click coarser. If you find you have to go significantly coarser, it's probably the bloom or pour.

## Dictionary

### Acidity
The fruitiness of the coffee.

### Astringency
Dryness in the mouth, where your tongue feels sandpapery. We're used to this sensation after drinking a cheap black tea. This is a dead giveaway that you've over-extracted the coffee, either by grinding too fine or brewing too long.

### Bloom
The process when just-wet coffee releases carbon dioxide and puffs up. Allowing the coffee grounds to bloom prior to pouring helps with even, fast extraction by removing pockets of gas that otherwise would have made channels in the slurry.

### Bloom Time
The time from when water first contacts the coffee bed to when the slurry stops puffing up.

### Body
The texture of the coffee, also known as mouthfeel. This may range anywhere from tea-like to soupy.

### Boulders
The stone-like particles of ground coffee. These often float to the top of your brew.

### Drawdown
The time from when all water is added to when the stream of water suddenly falters to single drips.

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
The wet coffee grounds in your pour over.

### Sweetness
Self explanatory, but sweetness is easy to perceive in relation to acidity (fruitiness). Is the lemon note tangy/puckery, or rounded/rich like lemonade?

## CLI Ideas

```bash
# Create a new journal entry
coffee-journal journal create
# Analyze which coffee origins had the highest scores
coffee-journal analytics score coffee.origin.country
```
