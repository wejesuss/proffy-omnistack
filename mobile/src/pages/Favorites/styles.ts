import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f7',
  },

  teacherList: {
    marginTop: -40,
  },

  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  noResultsText: {
    fontFamily: 'Archivo_400Regular',
    color: '#c1bccc',
    fontSize: 14,
    textAlign: 'center',
    maxWidth: 250,
  },
});

export default styles;
