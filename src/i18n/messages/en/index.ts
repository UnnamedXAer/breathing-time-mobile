import { MessagePlural } from '../../types';
import instructions from './instructions';

export default {
  date: {
    formats: {
      long_date: '%m/%d/%Y',
    },
  },
  common: {
    yes: 'Yes',
    no: 'No',
    ok: 'Ok',
    back: 'Back',
    cancel: 'Cancel',
    clear: 'Clear',
  },
  header: {
    home: 'Home',
    about: 'About',
  },
  home: {
    welcome: 'Welcome to %{0}',
    start_exercise: 'Start Your Breathing',
    exercise_instructions: 'Breathing Instructions',
    preferences: 'Preferences',
    overview: 'Results Overview',
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
    disable_breathing: 'Disable breathing sound',
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
      results_header: 'Results:',
      round_with_num: 'Round %{0}',
      seconds: {
        one: 'second',
        other: 'seconds',
      } as MessagePlural,
      averageTime: 'Average Time:',
      share_results_dialog_title: 'Share my results',
      share_results_title: 'Breathing Exercise Results',
      fail_to_open_share_msg: 'Sorry, could not open share dialog.',
      save_results: 'Save Results',
      save_success: 'Saved ✔',
      nothing_to_save: 'Nothing to save.',
      rounds_saved_toast: 'Results saved.',
      save_error: 'Sorry, failed to save the results.',
      only_checked_will_save: 'Only checked rows will be saved.',
      completed_at: 'Completed At: %{0}',
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
  overview: {
    title: 'Results overview',
    start_date_placeholder: 'Start date',
    end_date_placeholder: 'End date',
    no_results: 'No results found.',
    no_results_for_range: 'No results found for this dates range.',
    no_results_at_all: "You don't have any saved results at all.",
    session_rounds_count: 'Rounds: %{0}',
    session_avr_time: 'Average time: %{0}s',
    read_results_error: 'Sorry, failed load the results.',
    read_settings_error: 'Sorry, failed load the settings.',
    incorrect_dates: 'Incorrect dates range.',
    stats_title_total: 'Total:',
    stats_title_range: 'Selected date range:',
    stats_sessions: 'Sessions: ',
    stats_rounds: 'Rounds: ',
    stats_avg_round_time: 'Avg round time: ',
    stats_max_round_time: 'Max round time: ',
    stats_expand: 'Expand',
  },
  details: {
    title: 'Session results',
    read_exercise_error: "Couldn't load the data. Please refresh and try again.",
    delete_question:
      'Do you really want to delete this round ( %{0}s ), it is irreversible?',
    delete_question_includes_exercise:
      '\n\n! There will be no remaining rounds, therefore the session entry will be removed as well.',
    delete_confirm: 'Yes, delete',
    delete_success: 'Round removed.',
    delete_success_with_exercise: 'Round & session entry removed.',
    delete_failure: "Couldn't remove the round.\nRefresh and try again.",
    exercise_not_found: "Sorry. Couldn't find that exercise.",
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
  sounds: {
    load_fail: "Sounds effects couldn't be loaded.",
    toggle_muted_fail: "Couldn't toggle sounds.",
  },
};
