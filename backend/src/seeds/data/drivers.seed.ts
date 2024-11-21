export const driversSeed = [
  {
    id: '1',
    name: 'Homer Simpson',
    description:
      'Olá, eu sou o motorista Homer, seu motorista camarada, relaxe e aproveite o passeio.',
    car: 'Flymont Valiant 1973 rosa e enferrujado',
    review: {
      rating: 2,
      comment: 'Motorista descontraído, mas o carro é um pouco velho.',
    },
    ratePerKm: 2.5,
    minKm: 1,
  },
  {
    id: '2',
    name: 'Marge Simpson',
    description: 'Motorista confiável com um carro limpo e bem cuidado.',
    car: 'Station Wagon azul',
    review: {
      rating: 4.5,
      comment: 'Motorista cuidadosa e sempre pontual.',
    },
    ratePerKm: 3.0,
    minKm: 5,
  },
  {
    id: '3',
    name: 'Bart Simpson',
    description: 'O motorista mais radical, mas cuidado com as curvas!',
    car: 'Skate motorizado',
    review: {
      rating: 3,
      comment: 'O mais radical de todos, mas precisa melhorar na direção.',
    },
    ratePerKm: 1.5,
    minKm: 0,
  },
];
