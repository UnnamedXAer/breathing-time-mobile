import { LocaleMessages } from '../../types';

const instructions: LocaleMessages['instructions'] = {
  title: 'Informacje o Ćwiczeniu Oddechowym',
  phases: [
    {
      title: 'Ułóż się wygodnie',
      p: [
        'Połóż się lub usiądź zależnie co jest dla ciebie bardziej komfortowe, upewnij się, że możesz swobodnie oddychać - Twoje płuca mogą się rozszerzać bez żadnych ograniczeń. Każde dodatkowe spięcie mięśni utrudni ćwiczenie co będzie skutkować skróceniem czasu jaki wytrzymasz na wstrzymanym oddechu.',
      ],
    },
    {
      title: 'Weź 30-50 głębokich oddechów',
      p: [
        'Wdychaj powietrze głęboko przez nos lub usta i wydychaj przez usta. Staraj się wdychać głęboko w stronę brzucha. Nie zmuszaj się do wydychania, po prostu wypuść powietrze (około 30% powietrza zostanie w płucach).',
        'Możesz odczuwać zawroty głowy, mrowienie i drętwienie palców i nóg - są to normalne, nie szkodliwe efekty uboczne obniżenia się poziomu dwutlenku węgla we krwi.',
      ],
    },
    {
      title: 'Wstrzymaj oddech',
      p: [
        'Po ostatnim wydechu weź dodatkowy głęboki oddech - wypełnij płuca w pełni i pozwól powietrzu opuścić płuca - przestań oddychać. Wstrzymuj oddech aż poczujesz potrzebę nabrania powietrza.',
        'Wstrzymywanie oddechu może spowodować omdlenie jeśli będziesz zmuszał się za bardzo. Nie stanowi to zagrożenia ale lepiej nie doprowadzać do takiego stanu. Wstrzymywanie oddechu do momentu gdy uczucie potrzeby wzięcia oddechu jest umiarkowane do silnego jest wystarczające.',
      ],
    },
    {
      title: 'Regeneracja',
      p: [
        'Gdy poczujesz potrzebę wzięcia oddechu wciąg powietrze aby w pełni wypełniło płuca i wstrzymaj oddech na 15 sekund.',
        'Pierwsza runda jest zakończona.',
        'Następna runda zacznie się od etapu oddychania. Powtórz ten cykl 3 do 5 razy bez żadnych przerw pomiędzy.',
      ],
    },
    {
      title: 'Następna runda',
      p: ['Runda jest skończona. Rozpocznie się kolejna runda.'],
    },
  ],
};

export default instructions;
