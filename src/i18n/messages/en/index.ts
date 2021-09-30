import { MessagePlural } from '../../types';
import instructions from './instructions';

export default {
  common: {
    yes: 'Yes',
    no: 'No',
    ok: 'Ok',
    back: 'Back',
  },
  header: {
    home: 'Home',
    about: 'About',
  },
  home: {
    welcome: 'Welcome to %{0}',
    start_exercise: 'Start Your Breathing',
    exercise_instructions: 'Breathing Instructions',
    exercise_preferences: 'Preferences',
  },
  preferences: {
    title_app_preferences: 'App Preferences',
    app_locale: 'App Language:',
    app_theme: 'App theme:',
    title_breathing_exercise: 'Breathing Exercise Preferences',
    num_of_rounds: 'Number of rounds:',
    breaths_per_round: 'Breaths per round:',
    breathing_pace: 'Breathing pace:',
    breathing_pace_fast: 'fast',
    breathing_pace_moderate: 'moderate',
    breathing_pace_slow: 'slow',
    recovery_time: 'Recovery time:',
    disable_animation: 'Disable animation:',
    disable_start_tips: 'Disable start tips before exercise phases:',
    restore_default: 'Restore Default',
  },
  ex: {
    title: 'Breathing Exercise',
    start: {
      title: "Let's begin your breathing!",
      start: 'START',
      get_ready: 'Get Ready!',
      go: 'Go',
      see_instructions: 'See instructions',
    },
    breathing: {
      title: 'Breathing',
      start_tip: 'Breath deeply with counter.',
      skip_to_next: 'Tap twice on the screen to skip to the next phase.',
      animation_disabled: 'Animation disabled',
    },
    hold: {
      title: 'Breath Hold',
      round_info: 'Exhale and stop breathing until you feel urge to inhale.',
      start_tip: 'Take final deep breath, then let go and stop breathing.',
      next_phase: 'Next Phase',
      skip_to_next:
        'Press the button or tap twice on the screen to skip to the next phase.',
      warning_title: 'Hello!',
      warning_text: 'Are you still there?',
    },
    recovery: {
      title: 'Recovery',
      start_tip: 'Inhale deeply and stop breathing.',
      round_info: 'Take one deep breath and hold for %{0} seconds.',
      skip_to_next: 'Tap twice on the screen to skip to the next phase.',
      skip_to_summary: 'Tap twice on the screen to skip to the Summary screen.',
    },
    summary: {
      title: 'Summary',
      congrats_finished: 'Congrats you finished your breathing!',
      no_rounds_finished: 'You have not completed any round.',
      breathing_finished: 'Breathing finished.',
      go_to: 'Go to',
      and_start_breathing: 'and start your breathing.',
      round_with_num: 'Round %{0}',
      seconds: {
        one: 'second',
        other: 'seconds',
      } as MessagePlural,
      averageTime: 'Average Time:',
      share_results_dialog_title: 'Share my results',
      share_results_title: 'Breathing Exercise Results',
      fail_to_open_share_msg: 'Sorry, could not open share dialog.',
    },
    footer: {
      finish: 'Finish',
      finish_title: 'Finish breathing session',
      finish_message: 'Do you want to end the session now?',
      confirm: 'Yes, finish',
    },
    warning: {
      title: 'Attention',
      text: 'These breathing exercises can affect your motor control, cause temporary dizziness or even make you faint - do NOT do it while driving or in kind of dangerous places. Find safe place like couch or bed.',
    },
    phases: {
      title: "Round's phases",
      breathing: 'Breathing - take %{0} deep breaths.',
      hold: 'Breath hold - exhale then stop breathing until you feel urge to inhale.',
      recovery: 'Recovery - inhale deeply and hold breath for %{0} seconds.',
    },
    leave: {
      title: 'Warning!',
      content: 'Leave exercise? Progress will be lost.',
      yes: 'Yes, leave',
    },
  },
  about: {
    title: 'About Application',
    text1:
      'is a simple application designed to help you with breathing exercises based on the Wim Hof method.\nIt allows you to easily adjust tempo of exercise based on your ',
    text2:
      '.\nThe breathing exercises are the first of the three pillars in the Wim Hof Method. You can find more information on the ',
    text3: 'official website.',
    preferences: 'preferences',
    whm: 'Wim Hof Method',
    whm_link_title: 'Open official "Wim Hof Method" website',
    app_version: 'App version: %{0}',
  },
  instructions,
};
