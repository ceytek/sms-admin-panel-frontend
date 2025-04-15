interface District {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
  districts: District[];
}

export const cities: City[] = [
  {
    id: 41,
    name: "Kocaeli",
    districts: [
      { id: 1, name: "İzmit" },
      { id: 2, name: "Gebze" },
      { id: 3, name: "Darıca" },
      { id: 4, name: "Körfez" },
      { id: 5, name: "Gölcük" },
      { id: 6, name: "Derince" },
      { id: 7, name: "Kandıra" },
      { id: 8, name: "Karamürsel" },
      { id: 9, name: "Başiskele" },
      { id: 10, name: "Kartepe" },
      { id: 11, name: "Çayırova" },
      { id: 12, name: "Dilovası" }
    ]
  },
  {
    id: 34,
    name: "İstanbul",
    districts: [
      { id: 1, name: "Kadıköy" },
      { id: 2, name: "Beşiktaş" },
      { id: 3, name: "Üsküdar" },
      { id: 4, name: "Şişli" },
      { id: 5, name: "Ataşehir" },
      { id: 6, name: "Maltepe" },
      { id: 7, name: "Pendik" },
      { id: 8, name: "Kartal" },
      { id: 9, name: "Beyoğlu" },
      { id: 10, name: "Fatih" }
    ]
  },
  {
    id: 6,
    name: "Ankara",
    districts: [
      { id: 1, name: "Çankaya" },
      { id: 2, name: "Keçiören" },
      { id: 3, name: "Yenimahalle" },
      { id: 4, name: "Mamak" },
      { id: 5, name: "Etimesgut" },
      { id: 6, name: "Sincan" },
      { id: 7, name: "Altındağ" },
      { id: 8, name: "Pursaklar" },
      { id: 9, name: "Gölbaşı" },
      { id: 10, name: "Polatlı" }
    ]
  }
]; 