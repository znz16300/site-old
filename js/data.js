const keyTableNews = "1iE8XXyoZ9nBOnxsYUJ_Og-09LfKYQJ9emDatNQIUh3k";
const keyTableDocs ="1O_bJjH8TAHww34uxA51rdyJoX4PaxMGOzL57N8G7H34";
const keyTablePages = '1F6QVr9WNio-_ODmnIlMTSHeSQxLOjgnd0nYB1_z0BeI';
const titles = ['Чого б ти не вчився, ти вчишся для себе', 
              'У нас мета одна-єдина: зростить людиною дитину',
              'Школа - це основа, на якій будується все майбутнє життя',
              'Школа робить дитину сильною та відповідальною',

]

const pets = [
    {
      "id": "1",
      "name": "Кабінет фізики",
      "img": "./assets/images/physics1.jpg",
      "type": "Завідувачка кабінетом",
      "breed": "Пилипенко О.П.",
      "description": "Завданням функціонування кабінету фізики є створення передумов для:організації індивідуального та диференційованого навчання; реалізації практично-дійової і творчої складових змісту навчання; організації роботи гуртків та факультативів; індивідуальної підготовки вчителя до занять та підвищення його науково-методичного рівня.",
      "age": "2015 рік",
      "inoculations": ["none"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "id": "2",
      "name": "Кабінет біології",
      "img": "./assets/images/biology.jpg",
      "type": "Завідувачка кабінетом",
      "breed": "Богдан О.І.",
      "description": "Кабінет біології Куликівського ЗЗСО І-ІІІ ступенів обладнаний обладнанням для проведення всіх практичних робіт з предмету, сучасними демонстраційними матеріалами для викладання. Клас оснащено інтерактивною дошкою та вчительським ноутбуком. Всі уроки вчителі проводять з використанням комп'ютерних презентацій або навчального програмного забезпечення.",
      "age": "2008 рік",
      "inoculations": ["none"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "id": "3",
      "name": "Кабінет географії",
      "img": "./assets/images/geography.jpg",
      "type": "Завідувачка кабінетом",
      "breed": "\nІванюк О.М.",
      "description": "Кабінет географії Куликівського ЗЗСО І-ІІІ ступенів обладнаний обладнанням для проведення всіх практичних робіт з предмету, сучасними демонстраційними матеріалами для викладання. Клас оснащено інтерактивною дошкою та вчительським ноутбуком. Всі уроки вчителі проводять з використанням комп'ютерних презентацій або навчального програмного забезпечення.",
      "age": "2015 р.",
      "inoculations": ["none"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "id": "4",
      "name": "Лінгафонний кабінет",
      "img": "./assets/images/ling2.jpg",
      "type": "Завідувачка кабінетом",
      "breed": "Мельник В.М.",
      "description": "Лінгафонний кабінет – це  спеціально обладнаний простір, який містить в собі комплекти звукової апаратури, відео обладнання та проектори. Така комплектація дозволяє створити оптимальні умови для самостійної навчальної роботи та розвитку навичок мовлення.",
      "age": "2019 рік",
      "inoculations": ["none"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "id": "5",
      "name": "Кабінет інформатики",
      "img": "./assets/images/inform.jpg",
      "type": "Завідувач кабінетом",
      "breed": "Чава С.А.",
      "description": "Кабінет інформатики згідно вимог сьогодення. Це дає можливість учням оволодіти актуальними знаннями та навичками на належному рівні, робить здобуту освіту конкурентною.",
      "age": "2018 рік",
      "inoculations": ["none"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "id": "6",
      "name": "Обслуговуючої праці",
      "img": "./assets/images/obsl1.jpg",
      "type": "Завідувачка кабінетом",
      "breed": "Сало А.В.",
      "description": "",
      "age": "2019 рік",
      "inoculations": ["none"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "id": "7",
      "name": "Початкових класів",
      "img": "./assets/images/poch_kl2.jpg",
      "type": "Учитель початкових класів",
      "breed": "Ревко А.О.",
      "description": "",
      "age": "2019 рік",
      "inoculations": ["none"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "id": "8",
      "name": "Інклюзивне навчання",
      "img": "./assets/images/inkl1.jpg",
      "type": "",
      "breed": "",
      "description": "",
      "age": "8 years",
      "inoculations":["none"],
      "diseases": ["none"],
      "parasites": ["none"],
    },
    
    {
      "id": "9",
      "name": "Зала рукопашного бою",
      "img": "./assets/images/handfight.jpg",
      "type": "",
      "breed": "",
      "description": "",
      "age": "8 years",
      "inoculations": ["none"],
      "diseases": ["none"],
      "parasites": ["none"],
    },
    {
      "id": "10",
      "name": "Їдальня",
      "img": "./assets/images/k1.jpg",
      "type": "",
      "breed": "",
      "description": "",
      "age": "",
      "inoculations": ["none"],
      "diseases": ["none"],
      "parasites": ["none"],
    },
    {
      "id": "11",
      "name": "Харчоблок",
      "img": "./assets/images/k2.jpg",
      "type": "",
      "breed": "",
      "description": "",
      "age": "",
      "inoculations": ["none"],
      "diseases": ["none"],
      "parasites": ["none"],
    },
    {
      "id": "12",
      "name": "Кабінет математики",
      "img": "./assets/images/km2.jpg",
      "type": "Завідувачка кабінетом",
      "breed": "Долиненко В.А.",
      "description": "Кабінет оснащено сучасною інтерактивною панеллю з екраном 65”, документ камерою, принтером та ламінатором. У кабінеті встановлено нові меблі.",
      "age": "2021 рік",
      "inoculations": ["none"],
      "diseases": ["none"],
      "parasites": ["none"],
    },

  ]
