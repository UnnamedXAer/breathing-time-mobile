import { LocaleMessages } from '../../types';
import instructions from './instructions';

const pl: LocaleMessages = {
  common: {
    yes: 'Tak',
    no: 'Nie',
    ok: 'Ok',
    back: 'Wstecz',
  },
  home: {
    welcome: 'Witaj w %{0}',
    start_exercise: 'Zacznij Oddychać',
    exercise_instructions: 'Informacje o Ćwiczeniu Oddechowym',
    exercise_preferences: 'Preferencje',
  },
  header: {
    home: 'Ekran Główny',
    about: 'O Aplikacji',
  },
  preferences: {
    title_app_preferences: 'Ustawienia Aplikacji',
    app_locale: 'Język aplikacji:',
    app_theme: 'Motyw aplikacji:',
    title_breathing_exercise: 'Preferencje Ćwiczenia Oddechowego',
    num_of_rounds: 'Liczba rund:',
    breaths_per_round: 'Oddechy na runde:',
    breathing_pace: 'Tempo oddechów:',
    breathing_pace_fast: 'szybko',
    breathing_pace_moderate: 'umiarkowany',
    breathing_pace_slow: 'wolno',
    recovery_time: 'Czas regeneracji:',
    disable_animation: 'Wyłącz animacje',
    disable_start_tips: 'Wyłącz początkowe podpowiedzi',
    restore_default: 'Przywróć Domyślne',
  },
  ex: {
    title: 'Ćwiczenia Oddechowe',
    start: {
      title: 'Zacznij Oddychać!',
      start: 'START',
      get_ready: 'Przygotuj się!',
      go: 'Zaczynamy',
      see_instructions: 'Zobacz Instrukcje',
    },
    breathing: {
      title: 'Oddychanie',
      start_tip: 'Oddychaj głeboko zgodnie z licznikiem.',
      skip_to_next: 'Stuknij dwukrotnie, żeby przejść do następnego etapu.',
      animation_disabled: 'Animacja wyłączona',
    },
    hold: {
      title: 'Wstrzymaj oddech',
      round_info: 'Zrób wydech i wstrzymaj oddech aż poczujesz potrzebę wzięcia wdechu.',
      start_tip:
        'Weź ostatni głęboki wdech, a następnie wypuść powietrze i przestań oddychać.',
      next_phase: 'Następny Etap',
      skip_to_next:
        'Naciśnij przycisk lub stuknij dwukrotnie w ekran, żeby przejśc do następnego etapu.',
      warning_title: 'Halo!',
      warning_text: 'Jesteś tam jeszcze?',
    },
    recovery: {
      title: 'Regeneracja',
      round_info: 'Wstrzymaj oddech na %{0} sekund.',
      start_tip: 'Weź głęboki wdech i przestań oddychać.',
      skip_to_next: 'Stuknij dwukrotnie, żeby przejść do następnego etapu.',
      skip_to_summary: 'Stuknij dwukrotnie, żeby przejść do ekranu podsumowania.',
    },
    summary: {
      title: 'Podsumowanie',
      congrats_finished: 'Gratulacjee, ukończyleś swoje oddychanie!',
      no_rounds_finished: 'Nie ukończyłeś żadnej rundy.',
      breathing_finished: 'Oddychanie zakończone.',
      go_to: 'Idź do',
      and_start_breathing: 'i zacznij swoje oddychanie.',
      round_with_num: 'Runda %{0}',
      seconds: {
        one: 'sekunda',
        many: 'sekund',
        few: 'sekundy',
        other: 'sekundy',
        zero: 'sekund',
      },
      averageTime: 'Średni czas:',
      share_results_dialog_title: 'Udostępnij mój wynik',
      share_results_title: 'Wyniki Cwiczenia Oddechowego',
      fail_to_open_share_msg: 'Przepraszam, nie udało się otworzyć opcji udostępniania.',
    },
    footer: {
      finish: 'Zakończ',
      finish_title: 'Zakończ sesje oddychania',
      finish_message: 'Czy chcesz zakonczyć sesje teraz?',
      confirm: 'Tak, zakończ',
    },
    warning: {
      title: 'Uwaga',
      text: 'Te ćwiczenia oddechowe mogą wpływać na kontrolę motoryczną, powodować przejściowe zawroty głowy, a nawet powodować omdlenia - NIE wykonuj ich podczas jazdy lub w niebezpiecznych miejscach oraz w wodzie. Znajdź bezpieczne miejsce, takie jak kanapa lub łóżko.',
    },
    phases: {
      title: 'Etapy rundy',
      breathing: 'Oddychanie - weź %{0} głębokich oddechów.',
      hold: 'Wstrzymaj oddech - wypuść powietrze i wstrzymaj oddech aż poczujesz potrzebę wzięcia wdechu.',
      recovery: 'Regeneracja - weź głęboki wdech i wstrzymaj oddech na %{0} sekundy.',
    },
    leave: {
      title: 'Uwaga!',
      content: 'Przerwać ćwiczenie? Progres zostanie utracony.',
      yes: 'Tak, przerwij',
    },
  },
  about: {
    title: 'O Aplikacji',
    text1:
      'to aplikacja zaprojektowana aby pomóc Ci w ćwiczeniach oddechowych na podstawie Metody Wima Hoffa.\nW applikacji możesz w łatwy sposób dostosować tempo ćwiczenia oddechowego na podstawie swoich ',
    text2:
      '.\nTe ćwiczenia oddechowe są pierwszym z trzech filarów w Metodzie Wima Hofa. Więcej informacji znajdzie na oficjalnej stronie: ',
    text3: '.',
    preferences: 'preferencje',
    whm: 'Wim Hof Method',
    whm_link_title: 'Otwórz oficjaną stronę Metody Wima Hofa',
    app_version: 'Wersja applikacji: %{0}',
  },
  instructions,
};

export default pl;