import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../components/ui/Button';
import {
  customizableExerciseStateProps,
  restoreDefaultPreferences,
  updatePreferences,
} from '../store/exercise';
import { RootState } from '../store/types';
import {
  ExerciseCustomizableProps,
  ExerciseCustomizableState,
} from '../store/exercise/types';
import Layout from '../constants/Layout';
import Headline from '../components/ui/Headline';
import Slider from '../components/ui/Slider';
import Switch from '../components/ui/Switch';
import { RootStackScreenProps } from '../navigation/types';
import {
  Locale,
  LocaleKey,
  Locales,
  Theme,
  ThemeKey,
  Themes,
} from '../store/settings/types';
import { restoreDefaultSettings, updateSettings } from '../store/settings';
import Select from '../components/ui/Select';
import { t } from 'i18n-js';
import { updateLocale } from '../i18n/helpers';

const themesSelectData = [] as Array<{ key: Theme; label: ThemeKey }>;
const localesSelectData = [] as Array<{ key: Locale; label: LocaleKey }>;

for (const key in Themes) {
  themesSelectData.push({
    key: Themes[key as ThemeKey],
    label: key as ThemeKey,
  });
}

for (const key in Locales) {
  localesSelectData.push({
    key: Locales[key as LocaleKey],
    label: key as LocaleKey,
  });
}

export default function PreferencesScreen({
  navigation,
}: RootStackScreenProps<'Preferences'>) {
  const dispatch = useDispatch();
  const { settings } = useSelector((state: RootState) => state);
  const themeInitialValue = useRef(
    themesSelectData.find((x) => x.key === settings.theme)!.label,
  ).current;
  const localeInitialValue = useRef(
    localesSelectData.find((x) => x.key === settings.locale)!.label,
  ).current;

  const [triggerSettingsReset, setTriggerSettingsReset] = useState<boolean | undefined>();

  const exerciseConfig = useSelector((state: RootState) => {
    const config = {} as ExerciseCustomizableState;

    customizableExerciseStateProps.forEach(
      <K extends ExerciseCustomizableProps>(prop: K) => {
        config[prop] = state.exercise[prop];
      },
    );

    return config;
  });

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={{ marginBottom: Layout.spacing(1) }}>
          <View style={styles.headerContainer}>
            <Headline variant={'h2'} style={{ textAlign: 'center' }}>
              {t('preferences.title_app_preferences')}
            </Headline>
          </View>

          <Select
            label={t('preferences.app_locale')}
            triggerReset={triggerSettingsReset}
            data={localesSelectData}
            initValue={localeInitialValue}
            onChange={(option) => {
              updateLocale(option.key);
              dispatch(
                // TODO #2 setting locale to Default doesn't change the app language
                updateSettings({
                  propName: 'locale',
                  value: option.key,
                }),
              );
            }}
          />

          <Select
            label={t('preferences.app_theme')}
            triggerReset={triggerSettingsReset}
            data={themesSelectData}
            initValue={themeInitialValue}
            onChange={(option) => {
              dispatch(
                updateSettings({
                  propName: 'theme',
                  value: option.key,
                }),
              );
            }}
          />

          <View style={styles.actionsContainer}>
            <Button
              title={t('preferences.restore_default')}
              size="small"
              mode="outlined"
              onPress={() => {
                setTriggerSettingsReset((pv) => !pv);
                dispatch(restoreDefaultSettings());
                updateLocale(Locales.Default);
              }}
            />
          </View>
        </View>

        <View style={styles.headerContainer}>
          <Headline variant={'h2'} style={{ textAlign: 'center' }}>
            {t('preferences.title_breathing_exercise')}
          </Headline>
        </View>

        <View>
          <Slider
            label={t('preferences.num_of_rounds')}
            value={exerciseConfig.numberOfRounds}
            trackMarks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            min={1}
            max={10}
            step={1}
            onChange={(value) => {
              dispatch(
                updatePreferences({
                  propName: 'numberOfRounds',
                  value,
                }),
              );
            }}
          />

          <Slider
            label={t('preferences.breaths_per_round')}
            value={exerciseConfig.breathsPerRound}
            min={10}
            max={60}
            step={5}
            trackMarks={[10, 20, 30, 40, 50, 60]}
            trackMultiplier={10}
            onChange={(value) => {
              dispatch(
                updatePreferences({
                  propName: 'breathsPerRound',
                  value,
                }),
              );
            }}
          />

          <Slider
            label={t('preferences.breathing_pace')}
            value={exerciseConfig.breathTime}
            valueTranslation={{
              1400: t('preferences.breathing_pace_fast'),
              2000: t('preferences.breathing_pace_moderate'),
              2600: t('preferences.breathing_pace_slow'),
            }}
            min={1400}
            max={2600}
            step={600}
            trackMultiplier={600}
            onChange={(value) => {
              dispatch(
                updatePreferences({
                  propName: 'breathTime',
                  value,
                }),
              );
            }}
          />

          <Slider
            label={t('preferences.recovery_time')}
            value={exerciseConfig.recoveryTime}
            min={5}
            max={30}
            step={5}
            trackMarks={[5, 10, 15, 20, 25, 30]}
            trackMultiplier={5}
            onChange={(value) => {
              dispatch(
                updatePreferences({
                  propName: 'recoveryTime',
                  value,
                }),
              );
            }}
          />

          <Switch
            label={t('preferences.disable_breathing')}
            value={exerciseConfig.disableBreathing}
            onChange={(value) => {
              dispatch(updatePreferences({ propName: 'disableBreathing', value }));
            }}
          />

          <Switch
            label={t('preferences.disable_animation')}
            value={exerciseConfig.disableAnimation}
            onChange={(value) => {
              dispatch(updatePreferences({ propName: 'disableAnimation', value }));
            }}
          />

          <Switch
            label={t('preferences.disable_start_tips')}
            value={exerciseConfig.disableStartTips}
            onChange={(value) => {
              dispatch(updatePreferences({ propName: 'disableStartTips', value }));
            }}
          />
        </View>

        <View style={styles.actionsContainer}>
          <Button
            title={t('preferences.restore_default')}
            size="small"
            mode="outlined"
            onPress={() => {
              dispatch(restoreDefaultPreferences());
            }}
          />
          <View style={styles.backBtn} />
          <Button
            title={t('common.back')}
            mode="contained"
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
  },
  scrollContainer: {
    paddingBottom: Layout.spacing(3),
    justifyContent: 'center',
    flexDirection: 'row',
  },
  container: {
    padding: Layout.spacing(2),
    flex: 1,
    maxWidth: 500,
  },
  headerContainer: {
    marginBottom: Layout.spacing(3),
  },
  actionsContainer: {
    alignItems: 'center',
    marginVertical: Layout.spacing(3),
  },
  backBtn: {
    marginBottom: Layout.spacing(2),
  },
});
