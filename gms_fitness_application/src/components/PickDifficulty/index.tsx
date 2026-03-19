import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Pressable, Image } from 'react-native';

import { swapIcon } from '../../utilities/constants/images';
import { Other } from '../TextComponents';

import { styles } from './styles';

interface PickDifficultyProps {
  selectedValue?: string
  onValueChange:(value: string)=>void
  options: string[]
}

const PickDifficulty = ({ selectedValue, onValueChange, options }: PickDifficultyProps) => {
  const { t } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelect = (value: string) => {
    onValueChange(value);
    setIsDropdownOpen(false);
  };

  return (
    <View style={styles.dropdownContainer}>
      <Pressable onPress={toggleDropdown} style={({ pressed }) => [styles.dropdownHeader, pressed && styles.pressed]}>
        <View style={styles.dropdownTexts}>
          <Other style={styles.difficultyText}>{t('difficulty')}</Other>
          <Image source={swapIcon} style={styles.image} />
        </View>
        <View style={styles.picker}>
          <Other style={styles.dropdownHeaderText}>{selectedValue || t('selectDifficulty')}</Other>
        </View>
      </Pressable>

      {isDropdownOpen && (
        <View style={styles.dropdownList}>
          {options.map((option) => (
            <Pressable
              key={option}
              onPress={() => handleSelect(option)}
              style={({ pressed }) => [styles.dropdownItem, pressed && styles.pressed]}
            >
              <Other style={styles.dropdownItemText}>{option}</Other>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

export default PickDifficulty;
