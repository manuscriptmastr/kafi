import R from 'ramda';
const {
  always,
  applySpec,
  assoc,
  converge,
  defaultTo,
  dissoc,
  endsWith,
  head,
  join,
  path,
  pipe,
  prop,
  last,
  split,
  unapply,
  unless
} = R;

export const schema0ToSchema1 = applySpec({
  schema: always('pourover_v1.0'),
  date: prop('date'),
  coffee: {
    weight: pipe(prop('ratio'), split(':'), head),
    grind: prop('grind'),
    origin: {
      country: path(['coffee', 'origin', 'country']),
      region: path(['coffee', 'origin', 'region']),
      grower: path(['coffee', 'origin', 'region'])
    },
    roaster: path(['coffee', 'roaster']),
    roastDate: path(['coffee', 'roastDate'])
  },
  water: {
    weight: pipe(prop('ratio'), split(':'), last),
    temperature: always('212ºF'),
    recipe: always('Third Wave Water')
  },
  equipment: prop('equipment'),
  recipe: {
    bloom: {
      weight: always('50g'),
      time: always('0:45')
    },
    notes: prop('technique')
  },
  time: prop('pourTime'),
  aroma: pipe(prop('aroma'), dissoc('notes'), assoc('descriptors', [])),
  acidity: pipe(prop('acidity'), dissoc('notes'), assoc('descriptors', [])),
  sweetness: pipe(prop('sweetness'), dissoc('notes'), assoc('descriptors', [])),
  body: pipe(prop('body'), dissoc('notes'), assoc('descriptors', [])),
  finish: pipe(prop('finish'), dissoc('notes'), assoc('descriptors', [])),
  notes: converge(unapply(join(' ')), [
    pipe(prop('observations'), unless(endsWith('.'), str => `${str}.`)),
    prop('flavor')
  ]),
  score: prop('score'),
  actionItem: pipe(prop('actionItem'), defaultTo(''))
})