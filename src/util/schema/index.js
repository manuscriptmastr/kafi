import R from 'ramda';
const {
  always,
  any,
  applySpec,
  converge,
  defaultTo,
  either,
  endsWith,
  head,
  ifElse,
  isEmpty,
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
  $schema: always('../schemas/pourover_v1.0.json'),
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
  aroma: {
    quantity: pipe(path(['aroma', 'quantity'])),
    quality: pipe(path(['aroma', 'quality'])),
    descriptors: prop('keywords')
  },
  acidity: {
    quantity: pipe(path(['acidity', 'quantity'])),
    quality: pipe(path(['acidity', 'quality'])),
    descriptors: prop('keywords')
  },
  sweetness: {
    quantity: pipe(path(['sweetness', 'quantity'])),
    quality: pipe(path(['sweetness', 'quality'])),
    descriptors: prop('keywords')
  },
  body: {
    quantity: pipe(path(['body', 'quantity'])),
    quality: pipe(path(['body', 'quality'])),
    descriptors: prop('keywords')
  },
  finish: {
    quantity: pipe(path(['finish', 'quantity'])),
    quality: pipe(path(['finish', 'quality'])),
    descriptors: prop('keywords')
  },
  notes: converge(unapply(ifElse(any(isEmpty), join(''), join(' '))), [
    pipe(prop('observations'), unless(either(isEmpty, endsWith('.')), str => `${str}.`)),
    prop('flavor')
  ]),
  score: prop('score'),
  actionItem: pipe(prop('actionItem'), defaultTo(''))
});
