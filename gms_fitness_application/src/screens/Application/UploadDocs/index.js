import { pick, types, isCancel } from '@react-native-documents/picker';
import { Heading2, Body2 } from 'components/TextComponents';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Pressable, Alert, Text } from 'react-native';
import FileViewer from 'react-native-file-viewer';

import { styles } from './styles';

const fitnessDocumentTypes = [
  {
    key: 'meal',
    descriptionKey: 'mealDescription',
    types: [types.pdf, types.images],
  },
  {
    key: 'workoutPlan',
    descriptionKey: 'workoutPlanDescription',
    types: [types.pdf],
  },
  {
    key: 'photoProgress',
    descriptionKey: 'photoProgressDescription',
    types: [types.images],
  },
  {
    key: 'motivationalMedia',
    descriptionKey: 'motivationalMediaDescription',
    types: [types.audio, types.video],
  },
  {
    key: 'healthMetrics',
    descriptionKey: 'healthMetricsDescription',
    types: [types.csv, types.xls, types.xlsx],
  },
];

const UploadDocs = () => {
  const { t } = useTranslation();
  const [uploadStatus, setUploadStatus] = useState({});

  const pickDocument = async (docKey, allowedTypes) => {
    setUploadStatus((prev) => ({
      ...prev,
      [docKey]: {
        uploading: true,
        uploaded: false,
        uploadedFiles: [],
        fileUris: [],
      },
    }));

    try {
      const result = await pick({
        type: allowedTypes,
        allowMultiSelection: true,
        copyTo: 'cachesDirectory',
      });

      if (result.length > 0) {
        setTimeout(() => {
          const fileNames = result.map((file) => file.name);
          const fileUris = result.map((file) => file.uri);

          setUploadStatus((prev) => ({
            ...prev,
            [docKey]: {
              uploading: false,
              uploaded: true,
              uploadedFiles: fileNames,
              fileUris: fileUris,
            },
          }));

          Alert.alert(
            t('fileSelected'),
            `${t('successfullySelected')} ${fileNames.length} ${t('file')}${fileNames.length > 1 ? 's' : ''}\n\n` +
            fileNames.map((name) => `• ${name}`).join('\n'),
          );
        }, 2000);
      } else {
        setUploadStatus((prev) => ({
          ...prev,
          [docKey]: {
            uploading: false,
            uploaded: false,
            uploadedFiles: [],
            fileUris: [],
          },
        }));
      }
    } catch (err) {
      setUploadStatus((prev) => ({
        ...prev,
        [docKey]: {
          uploading: false,
          uploaded: false,
          uploadedFiles: [],
          fileUris: [],
        },
      }));

      if (!isCancel(err)) {
        Alert.alert('Error', err.message || t('errorOccurred'));
      }
    }
  };

  const handleFilePress = (docKey) => {
    const status = uploadStatus[docKey];
    if (status?.uploaded && status.fileUris?.length > 0) {
      FileViewer.open(status.fileUris[0])
        .catch((error) => {
          Alert.alert(
            'Error',
            error.message || 'Failed to open document. Make sure you have an app that can open this file type.',
          );
        });
    } else {
      const docType = fitnessDocumentTypes.find((type) => type.key === docKey);
      if (docType) {
        pickDocument(docKey, docType.types);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Heading2 style={styles.header}>{t('fitnessDocumentUploadTitle')}</Heading2>

      {fitnessDocumentTypes.map((docType, index) => {
        const status = uploadStatus[docType.key] || {
          uploading: false,
          uploaded: false,
          uploadedFiles: [],
          fileUris: [],
        };

        return (
          <Pressable
            key={index}
            style={styles.card}
            onPress={() => handleFilePress(docType.key)}
            activeOpacity={0.7}
            disabled={status.uploading}
          >
            <View style={styles.cardContent}>
              <View style={styles.textContainer}>
                <Heading2 style={styles.cardTitle}>{t(docType.key)}</Heading2>
                <Body2 style={styles.cardDescription}>{t(docType.descriptionKey)}</Body2>

                {status.uploading && (
                  <>
                    <Text>{t('uploading')}...</Text>
                  </>
                )}

                {!status.uploading && status.uploaded && (
                  <>
                    <Text>{t('uploaded')}</Text>
                    {status.uploadedFiles.map((fileName, idx) => (
                      <Text
                        key={idx}
                        onPress={(e) => {
                          e.stopPropagation();
                          if (status.fileUris[idx]) {

                            FileViewer.open(status.fileUris[idx])
                              .catch((error) => {
                                Alert.alert(
                                  'Error',
                                  error.message || 'Failed to open document. Make sure you have an app that can open this file type.',
                                );
                              });
                          }
                        }}
                      >
                        • {fileName} (tap to open)
                      </Text>
                    ))}
                  </>
                )}
              </View>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

export default UploadDocs;
