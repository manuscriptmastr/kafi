import test from 'ava';
import { schema0ToSchema1 } from '.';

const ENTRY_1_VERSION_1 = {
  "date": "09/15/2020",
  "coffee": {
    "origin": {
      "country": "El Salvador",
      "region": "Ariz Family Pacamara"
    },
    "roaster": "Olympia Coffee Roasting Co",
    "roastDate": "09/03/2020"
  },
  "equipment": {
    "method": "Hario V60",
    "grinder": "Comandante C40 MK3"
  },
  "ratio": "22g:340g",
  "grind": 24,
  "bloomTime": "0:45",
  "pourTime": "3:54",
  "technique": "",
  "aroma": {
    "quantity": 2,
    "quality": 3,
    "notes": "Smooth, vanilla, fruit punch."
  },
  "acidity": {
    "quantity": 1,
    "quality": 1,
    "notes": "Literally killed the fruit notes. I taste something tangy but it has more of the character of bitterness."
  },
  "sweetness": {
    "quantity": 3,
    "quality": 1,
    "notes": "Empty except for the mouthfilling mint taste. Slightly astringent, though not nearly as much as I expected. No complexity."
  },
  "body": {
    "quantity": 3,
    "quality": 3,
    "notes": "Syrup."
  },
  "finish": {
    "quantity": 4,
    "quality": 1,
    "notes": "Minty mouthfeel, along with some (but not a lot of) astringency and a nagging 'bad breath' sensation."
  },
  "flavor": "This is actually not the worst cup of coffee I've made, but it is certainly the worst I've made in awhile. Syrupy, no tasting notes, with minty mouthfeel.",
  "keywords": [],
  "score": 3,
  "observations": "80g water bloom swirl. Tried out a different technique — poured roughly 5g/second, or finish by 1:45 (this time more like 1:55). First 60% from just below splatter height, second low as possible. Water was very clear during last stages of drawdown. Very slow, few to no boulders on sides. Very flat slurry.",
  "actionItem": "Definitely a clear example of how agitation affects brew time. With pour technique alone, I changed brew time within a range of 64 seconds. What I don't know is how to consistently hit somewhere in between this extreme (4.1g/s) and as-fast-as-possible (8.5g/s). Pour height may have made an even bigger impact as well."
};

const ENTRY_1_VERSION_2 = {
  schema: 'pourover_v1.0',
  date: '09/15/2020',
  coffee: {
    weight: '22g',
    grind: 24,
    origin: {
      country: 'El Salvador',
      region: 'Ariz Family Pacamara',
      grower: 'Ariz Family Pacamara'
    },
    roaster: 'Olympia Coffee Roasting Co',
    roastDate: '09/03/2020'
  },
  water: { weight: '340g', temperature: '212ºF', recipe: 'Third Wave Water' },
  equipment: { method: 'Hario V60', grinder: 'Comandante C40 MK3' },
  recipe: {
    bloom: { weight: '50g', time: '0:45' },
    notes: ''
  },
  time: '3:54',
  aroma: { quantity: 2, quality: 3, descriptors: [] },
  acidity: { quantity: 1, quality: 1, descriptors: [] },
  sweetness: { quantity: 3, quality: 1, descriptors: [] },
  body: { quantity: 3, quality: 3, descriptors: [] },
  finish: { quantity: 4, quality: 1, descriptors: [] },
  notes: '80g water bloom swirl. Tried out a different technique — poured roughly 5g/second, or finish by 1:45 (this time more like 1:55). First 60% from just below splatter height, second low as possible. Water was very clear during last stages of drawdown. Very slow, few to no boulders on sides. Very flat slurry. This is actually not the worst cup of coffee I\'ve made, but it is certainly the worst I\'ve made in awhile. Syrupy, no tasting notes, with minty mouthfeel.',
  score: 3,
  actionItem: "Definitely a clear example of how agitation affects brew time. With pour technique alone, I changed brew time within a range of 64 seconds. What I don't know is how to consistently hit somewhere in between this extreme (4.1g/s) and as-fast-as-possible (8.5g/s). Pour height may have made an even bigger impact as well."
};

test('schema0ToSchema1(entry) does a thing', t => {
  t.deepEqual(schema0ToSchema1(ENTRY_1_VERSION_1), ENTRY_1_VERSION_2);
});

const ENTRY_2_VERSION_1 = {
  "date": "08/06/2020",
  "coffee": {
    "origin": {
      "country": "Ethiopia",
      "region": "Nano Challa"
    },
    "roaster": "Madcap Coffee Company",
    "roastDate": "07/26/2020"
  },
  "equipment": {
    "method": "Hario V60",
    "grinder": "Hario Skerton Pro"
  },
  "ratio": "25g:340g",
  "grind": 9,
  "bloomTime": "0:35",
  "pourTime": "4:00",
  "technique": "",
  "aroma": {
    "quantity": 1,
    "quality": 3,
    "notes": "Light, hint of berries?"
  },
  "acidity": {
    "quantity": 3,
    "quality": 1,
    "notes": "More of a cooked than fresh fruit, but bland"
  },
  "sweetness": {
    "quantity": 4,
    "quality": 4,
    "notes": "A bit like a golden delicious apple, honey-ish"
  },
  "body": {
    "quantity": 2,
    "quality": 3,
    "notes": "Thin in spite of four minute pour time. Flat."
  },
  "finish": {
    "quantity": 4,
    "quality": 3,
    "notes": "Loooooong finish. Distinct herb or grassy note, alternates between pleasant and not."
  },
  "flavor": "Usually distinct lemon — this time softer fruit, like a peach or apple. Rather flat yet sour (tongue is dry), possibly due to long extraction time. Pleasant, tea-like finish with a distinct “grass” note coming in and out.",
  "keywords": [],
  "score": 3,
  "observations": ""
};

const ENTRY_2_VERSION_2 = {
  schema: 'pourover_v1.0',
  date: '08/06/2020',
  coffee: {
    weight: '25g',
    grind: 9,
    origin: {
      country: 'Ethiopia',
      region: 'Nano Challa',
      grower: 'Nano Challa'
    },
    roaster: 'Madcap Coffee Company',
    roastDate: '07/26/2020'
  },
  water: { weight: '340g', temperature: '212ºF', recipe: 'Third Wave Water' },
  equipment: { method: 'Hario V60', grinder: 'Hario Skerton Pro' },
  recipe: {
    bloom: { weight: '50g', time: '0:45' },
    notes: ''
  },
  time: '4:00',
  aroma: { quantity: 1, quality: 3, descriptors: [] },
  acidity: { quantity: 3, quality: 1, descriptors: [] },
  sweetness: { quantity: 4, quality: 4, descriptors: [] },
  body: { quantity: 2, quality: 3, descriptors: [] },
  finish: { quantity: 4, quality: 3, descriptors: [] },
  notes: 'Usually distinct lemon — this time softer fruit, like a peach or apple. Rather flat yet sour (tongue is dry), possibly due to long extraction time. Pleasant, tea-like finish with a distinct “grass” note coming in and out.',
  score: 3,
  actionItem: ''
};

test('schema0ToSchema1(entry) does another thing', t => {
  t.deepEqual(schema0ToSchema1(ENTRY_2_VERSION_1), ENTRY_2_VERSION_2);
});

const ENTRY_3_VERSION_1 = {
  "date": "12/02/2020",
  "coffee": {
    "origin": {
      "country": "Ethiopia",
      "region": "Reko"
    },
    "roaster": "Cat and Cloud Coffee",
    "roastDate": "11/11/2020"
  },
  "equipment": {
    "method": "Hario V60",
    "grinder": "Comandante C40 MK3"
  },
  "ratio": "22g:355g",
  "grind": 20,
  "bloomTime": "0:45",
  "pourTime": "3:02",
  "technique": "Bloom swirl 50g water wide and aggressively for 12 seconds, bloom for a total of 45 seconds, pour 130g in by 1:00 as high as possible while slowly hitting all grounds, 215g/1:15 (high), 285g/1:30 as low as possible while getting close to the edges to push boulders toward the slurry, 355g/1:45 (low). Do a 2–3 second Rao Spin ASAP.",
  "aroma": {
    "quantity": 2,
    "quality": 2,
    "notes": "Indistinct, vanilla."
  },
  "acidity": {
    "quantity": 3,
    "quality": 4,
    "notes": "Slightly tangy, almost salty, heavy, robust, kind of acidity. Still some brightness and excitement, though hushed overall."
  },
  "sweetness": {
    "quantity": 3,
    "quality": 4,
    "notes": "Luscious, balanced with acidity."
  },
  "body": {
    "quantity": 2,
    "quality": 3,
    "notes": "Light syrup."
  },
  "finish": {
    "quantity": 2,
    "quality": 3,
    "notes": "Tiniest bit of warmth. Mouth has just a slight toothpaste feel — inside of lips are sticky and tongue rubs loudly against teeth."
  },
  "flavor": "Overall, fairly balanced. Sweetness to acidity ratio is balanced, and I'm not really getting bitterness as the cup cools. I don't find this cup necessarily exciting or intriguing, though.",
  "keywords": ["balanced", "salty", "heavy", "robust", "ocher", "luscious"],
  "score": 8,
  "observations": "Drawdown looked fairly consistent",
  "actionItem": ""
};

const ENTRY_3_VERSION_2 = {
  schema: 'pourover_v1.0',
  date: '12/02/2020',
  coffee: {
    weight: '22g',
    grind: 20,
    origin: { country: 'Ethiopia', region: 'Reko', grower: 'Reko' },
    roaster: 'Cat and Cloud Coffee',
    roastDate: '11/11/2020'
  },
  water: { weight: '355g', temperature: '212ºF', recipe: 'Third Wave Water' },
  equipment: { method: 'Hario V60', grinder: 'Comandante C40 MK3' },
  recipe: {
    bloom: { weight: '50g', time: '0:45' },
    notes: 'Bloom swirl 50g water wide and aggressively for 12 seconds, bloom for a total of 45 seconds, pour 130g in by 1:00 as high as possible while slowly hitting all grounds, 215g/1:15 (high), 285g/1:30 as low as possible while getting close to the edges to push boulders toward the slurry, 355g/1:45 (low). Do a 2–3 second Rao Spin ASAP.' 
  },
  time: '3:02',
  aroma: { quantity: 2, quality: 2, descriptors: ["balanced", "salty", "heavy", "robust", "ocher", "luscious"] },
  acidity: { quantity: 3, quality: 4, descriptors: ["balanced", "salty", "heavy", "robust", "ocher", "luscious"] },
  sweetness: { quantity: 3, quality: 4, descriptors: ["balanced", "salty", "heavy", "robust", "ocher", "luscious"] },
  body: { quantity: 2, quality: 3, descriptors: ["balanced", "salty", "heavy", "robust", "ocher", "luscious"] },
  finish: { quantity: 2, quality: 3, descriptors: ["balanced", "salty", "heavy", "robust", "ocher", "luscious"] },
  notes: 'Drawdown looked fairly consistent. Overall, fairly balanced. Sweetness to acidity ratio is balanced, and I\'m not really getting bitterness as the cup cools. I don\'t find this cup necessarily exciting or intriguing, though.',
  score: 8,
  actionItem: ''
};

test('schema0ToSchema1(entry) does a third thing', t => {
  t.deepEqual(schema0ToSchema1(ENTRY_3_VERSION_1), ENTRY_3_VERSION_2);
});
