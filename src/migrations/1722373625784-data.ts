import { MigrationInterface, QueryRunner } from 'typeorm';

export class Data1722373625784 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Вставка данных в таблицу users
    await queryRunner.query(`
      INSERT INTO public.users (id, username, email, password, role, "profileId") VALUES
        ('13523f05-a606-4013-beab-63dc736b25be', 'stopcallingmyname', 'stopcallingmyname1337@gmail.com', '$2b$10$4ko9e0.z.Emz7AeQ5I0ZCu8OMarjO1EEyH05pLreibVDxKak03sa.', 'User', '530e9433-081a-47b0-9c99-bca2577f3709'),
        ('b820eb86-83bc-4a8f-ab89-da6d214e5c7c', 'scout', 'x666rxse@gmail.com', '$2b$10$ciuZavc2Uujj9MjNVlgXNeP9xckMvwN/CttHo3X4B9pg3sCVi7FIi', 'User', '93cf273b-6820-4045-92b5-3b5c9e621a22'),
        ('1c12e7c7-8f20-48ef-b91e-961755bf2f6e', 'jajaja', 'jajaja@gmail.com', '$2b$10$VJZb0e.rr/CLjh9yF18j2O6yrU0y21mEsYFjsdNwUH/3GYPt3PQ22', 'User', 'f10ab340-19ca-4d6b-81e7-562ef240995c'),
        ('52282229-a2b2-473b-95a5-65815da731da', 'fakesideways', 'chocoloco926@gmail.com', '$2b$10$viNZvq3pb12C9akpwaPFhu8ucpqoIwpHUrNcbLETZ0h.kb3spI8FO', 'User', '3698ca08-1e3c-4dd4-9326-6cacef5138ae'),
        ('2f4ed444-d641-49a4-80f9-7f7ad76be0a0', 'Nikita Haletsky', 'haletsky.nick@gmail.com', '$2b$10$F1Cx4bjuF1/Nxpjj422V1OeLlSxcVMkBEgECCtR54pVuq/16WVtyG', 'User', '87e8dda6-103c-40aa-8a81-313d913b3fdd'),
        ('5478087f-b36c-4846-8de0-1a318bdaec01', 'nikita.haker06', 'x666koffman@gmail.com', '$2b$10$COkylIdg4yIX5Bw1TTtIV.z9Wn.ejVWNRRf7woz8QbhmEJThWbMtq', 'User', '47f9e306-c3d8-402f-9e06-d25a480aa071');
    `);

    // Вставка данных в таблицу profiles
    await queryRunner.query(`
        INSERT INTO public.profiles (
          id, registration_date, full_name, location, bio, personal_website_url, avatar_url,
          twitter_url, facebook_url, instagram_url, github_url, behance_url, "linkedIn_url",
          vimeo_url, open_to_work, "averageTimeSpent"
        ) VALUES
          ('530e9433-081a-47b0-9c99-bca2577f3709', '2024-05-25 23:14:51.169774', 'Nikita Khaletsky', 'Bolivia', 'I''m a passionate Front-End Developer :)', 'jajajaaj@com', 'https://ucarecdn.com/359eed56-59b5-4e3b-843b-6d43ebd29e47/', 'twittter', 'ewaghryjtuy', 'sfgdhjfgjythgf', 'rgestytjuykitutyjhg', 'esrytyk,uyjtyht', 'agrsyjty', 'fwarhtdyjtu', 't', 6),
          ('93cf273b-6820-4045-92b5-3b5c9e621a22', '2024-05-26 17:17:40.839339', 'NickJr', 'Bolviva', 'Experienced Graphic Designer.', 'sadafafewaf', 'https://ucarecdn.com/13a64679-1be1-43e2-ad03-8571d9fcc8b5/', 'http://assadasd.com/', 'facebook', 'instagram', 'github', 'behance', 'linekdIn', 'vimeo', 't', 4),
          ('f733eee5-801f-4428-90b9-abfad7b3628e', '2024-05-25 23:15:07.231091', '404Hacker', NULL, NULL, NULL, 'https://cdn.dribbble.com/users/8930728/screenshots/17792014/media/3435e42c32291afe0f2edfb73af3361d.png?resize=1600x1200&vertical=center', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL),
          ('87e8dda6-103c-40aa-8a81-313d913b3fdd', '2024-06-11 12:59:40.062475', 'jajaja69', NULL, NULL, NULL, 'https://cdn.dribbble.com/userupload/3348699/file/original-d299b0c398776d0b07a2f3236656232f.jpg?resize=1504x1128', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', 3),
          ('3698ca08-1e3c-4dd4-9326-6cacef5138ae', '2024-06-07 00:35:52.490607', '0x11b', NULL, NULL, NULL, 'https://cdn.dribbble.com/userupload/9572483/file/original-1e7a4f44b7eb9e34c9b00b9f8ad54452.png?resize=1504x1504', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', 7),
          ('f10ab340-19ca-4d6b-81e7-562ef240995c', '2024-05-26 17:46:56.750131', 'Marcus Peres', NULL, NULL, NULL, 'https://cdn.dribbble.com/users/24956/screenshots/17741010/media/b487f8753627459ab4462ff938181c2a.png?resize=1200x900&vertical=center', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL),
          ('47f9e306-c3d8-402f-9e06-d25a480aa071', '2024-06-20 14:18:54.37704', '404Hacker', NULL, NULL, NULL, 'https://ucarecdn.com/1a8ae94a-1740-433c-a8d2-c5a3ac2b7576/', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL);
      `);

    // Вставка данных в таблицу tags
    await queryRunner.query(`
        INSERT INTO public.tags (id, tag_name) VALUES
          ('517ea77e-da47-4c0b-be2d-125e128e56a2', 'Figma'),
          ('b2e1f623-efbb-49a6-a4c2-9cacfe304c7f', 'Cinema4d'),
          ('3877a170-ea81-4b42-b16e-5260cc32a752', 'Blender'),
          ('eba0f4bf-c0f4-453a-8e90-ad4d0d9a037c', 'Ae'),
          ('adaeb691-dc87-4238-bd20-d2180a9d7487', 'Ai'),
          ('53416e33-e949-4beb-ba55-26bcecec8a7e', 'Ps'),
          ('e3fac421-2cb6-4989-843c-f70a613b6aa3', 'Pr'),
          ('ba70f172-1589-4e44-b089-2a9101e68348', 'Adobe Photoshop'),
          ('bf0a2e4a-79f5-46c2-a41c-3b8b700a5014', 'Animation');
      `);

    // Вставка данных в таблицу projects
    await queryRunner.query(`
      INSERT INTO public.projects (
        id, title, description, components, likes, created_at, "updatedAt", "creatorId", preview_url, views, "timeSpent"
      ) VALUES
        ('b352399d-1500-45ed-9cd6-85df91d450f4', 'Death Metal Logo', NULL, NULL, 2, '2024-06-18 20:19:22.127537', '2024-07-25 22:10:36.145521', '93cf273b-6820-4045-92b5-3b5c9e621a22', 'https://ucarecdn.com/e6a75668-1895-4a14-82da-344626af0d2e/', 1, 6),
        ('57c62726-8fa2-436e-b26e-802f93d15614', 'Fish Logo', NULL, NULL, 1, '2024-06-20 13:42:19.000607', '2024-06-20 13:57:22.891715', '3698ca08-1e3c-4dd4-9326-6cacef5138ae', 'https://ucarecdn.com/37b1f5be-5e3d-4d8e-b25d-0b46261f9071/', 1, 1),
        ('94c8be72-1dd4-416c-92b8-ab652ea35452', 'Interior design', NULL, NULL, 2, '2024-06-20 13:43:12.565347', '2024-06-20 13:57:27.519404', '3698ca08-1e3c-4dd4-9326-6cacef5138ae', 'https://ucarecdn.com/0db8d94f-dccd-4967-98e2-6540769a8bfa/', 1, 14),
        ('bbd43e9a-b3fb-47db-8f9c-b83f8940079e', 'What about u?', NULL, NULL, 0, '2024-06-20 13:37:54.627011', '2024-06-20 13:37:54.627011', '3698ca08-1e3c-4dd4-9326-6cacef5138ae', 'https://ucarecdn.com/38236191-b6e4-4e90-9f92-e5139d59fd31/', 0, 7),
        ('dc1aaa55-65bc-45ac-8b1e-9ebbddf3489a', 'Uh Oh', NULL, NULL, 0, '2024-06-20 13:38:41.10063', '2024-06-20 13:38:41.10063', '3698ca08-1e3c-4dd4-9326-6cacef5138ae', 'https://ucarecdn.com/5f6318c4-a2e1-4868-a74e-84939eefb4e3/', 0, 2),
        ('3d7d3a54-9950-4062-8891-05cddea06452', 'W lettering 3D', NULL, NULL, 0, '2024-06-20 13:42:38.900599', '2024-06-20 13:42:38.900599', '3698ca08-1e3c-4dd4-9326-6cacef5138ae', 'https://ucarecdn.com/c24ae95c-a017-49f8-b3ec-5ae1f92f4398/', 0, 4),
        ('6767df6b-377c-4635-b65d-bc03bde633bd', 'Illustration of work', NULL, NULL, 2, '2024-06-20 13:27:57.590806', '2024-06-20 14:08:59.451793', '87e8dda6-103c-40aa-8a81-313d913b3fdd', 'https://ucarecdn.com/dc758a09-6771-4661-b056-e48d18ee126c/', 0, 3),
        ('f52221b6-a682-4682-aefc-5795e41c6249', 'Happy Holidays', NULL, NULL, 0, '2024-06-20 13:09:37.729697', '2024-06-20 13:09:37.729697', '530e9433-081a-47b0-9c99-bca2577f3709', 'https://ucarecdn.com/18b3d187-578d-4207-b5fa-d01ba10f5e6d/', 0, 6),
        ('abe12d0a-14ae-4f31-8a16-3010b169b975', 'Interior Render Commercial', NULL, NULL, 1, '2024-06-20 13:43:39.727375', '2024-06-20 13:57:12.164345', '3698ca08-1e3c-4dd4-9326-6cacef5138ae', 'https://ucarecdn.com/6e1339b4-9ff6-4ae4-84c7-c47b527acedb/', 1, 10),
        ('affd2cfc-7c03-4e6c-aa68-ae0387d4b8dd', 'Commercial Banner Design', NULL, NULL, 0, '2024-06-20 14:53:13.955554', '2024-06-20 14:53:13.955554', '530e9433-081a-47b0-9c99-bca2577f3709', 'https://ucarecdn.com/1ae1962c-25c4-4619-b546-318d8dbc4d58/', 0, 8),
        ('4fa047e9-4114-4651-a24e-6a78328d154f', 'Us', NULL, NULL, 2, '2024-06-16 01:05:28.659245', '2024-06-20 16:10:34.930692', '93cf273b-6820-4045-92b5-3b5c9e621a22', 'https://ucarecdn.com/40b5b33e-b3ac-48e3-810d-09bdbae48ddf/', 0, 1),
        ('445da3a2-4edd-4fab-8e9e-be506740778e', 'Summer vibes', NULL, NULL, 1, '2024-06-20 13:24:13.681636', '2024-06-20 16:13:31.965312', '530e9433-081a-47b0-9c99-bca2577f3709', 'https://ucarecdn.com/5ca989f8-42c7-4039-a9e4-0be33be273ae/', 0, 5),
        ('b9a4117b-32de-4423-8f12-f933abaead07', 'RGT Commercial', NULL, NULL, 0, '2024-06-20 13:07:46.763049', '2024-06-20 16:13:34.176877', '530e9433-081a-47b0-9c99-bca2577f3709', 'https://ucarecdn.com/566fad0f-7743-42bd-a395-b022f020f00a/', 0, 4),
        ('be01c3ea-5526-4c8c-ba79-e37e6d575b9a', 'RGT 1,000,000', NULL, NULL, 1, '2024-06-20 13:10:16.98354', '2024-06-20 16:13:36.296057', '530e9433-081a-47b0-9c99-bca2577f3709', 'https://ucarecdn.com/20593545-bf80-4773-9faa-e63f76249000/', 0, 8),
        ('9a09cdac-5c6c-4de8-ab5a-81fc2af52490', 'Awesome Render', NULL, NULL, 2, '2024-06-20 13:37:07.650517', '2024-07-22 11:56:37.166776', '3698ca08-1e3c-4dd4-9326-6cacef5138ae', 'https://ucarecdn.com/572a66fc-91eb-4e9f-abbd-38b5226e2a50/', 3, 12);
    `);

    // Вставка данных в таблицу subscriptions
    await queryRunner.query(`
      INSERT INTO public.subscriptions (id, followers_id, following_id) VALUES
        ('16', 'f733eee5-801f-4428-90b9-abfad7b3628e', '530e9433-081a-47b0-9c99-bca2577f3709'),
        ('48', '3698ca08-1e3c-4dd4-9326-6cacef5138ae', '530e9433-081a-47b0-9c99-bca2577f3709'),
        ('54', '530e9433-081a-47b0-9c99-bca2577f3709', '93cf273b-6820-4045-92b5-3b5c9e621a22');
    `);

    // Вставка данных в таблицу profiles_skills_tags
    await queryRunner.query(`
        INSERT INTO public.profiles_skills_tags ("profilesId", "tagsId") VALUES
          ('93cf273b-6820-4045-92b5-3b5c9e621a22', '517ea77e-da47-4c0b-be2d-125e128e56a2'),
          ('93cf273b-6820-4045-92b5-3b5c9e621a22', 'b2e1f623-efbb-49a6-a4c2-9cacfe304c7f'),
          ('93cf273b-6820-4045-92b5-3b5c9e621a22', '3877a170-ea81-4b42-b16e-5260cc32a752'),
          ('93cf273b-6820-4045-92b5-3b5c9e621a22', 'eba0f4bf-c0f4-453a-8e90-ad4d0d9a037c'),
          ('93cf273b-6820-4045-92b5-3b5c9e621a22', '53416e33-e949-4beb-ba55-26bcecec8a7e'),
          ('530e9433-081a-47b0-9c99-bca2577f3709', 'eba0f4bf-c0f4-453a-8e90-ad4d0d9a037c'),
          ('530e9433-081a-47b0-9c99-bca2577f3709', 'adaeb691-dc87-4238-bd20-d2180a9d7487'),
          ('530e9433-081a-47b0-9c99-bca2577f3709', '53416e33-e949-4beb-ba55-26bcecec8a7e'),
          ('530e9433-081a-47b0-9c99-bca2577f3709', '517ea77e-da47-4c0b-be2d-125e128e56a2'),
          ('530e9433-081a-47b0-9c99-bca2577f3709', 'e3fac421-2cb6-4989-843c-f70a613b6aa3'),
          ('93cf273b-6820-4045-92b5-3b5c9e621a22', 'adaeb691-dc87-4238-bd20-d2180a9d7487'),
          ('93cf273b-6820-4045-92b5-3b5c9e621a22', 'e3fac421-2cb6-4989-843c-f70a613b6aa3');
      `);

    // Вставка данных в таблицу project_tags
    await queryRunner.query(`
        INSERT INTO public.project_tags ("projectId", "tagId") VALUES
          ('1e485a2e-1072-49e6-bc7b-4ab1afebd9ac', '517ea77e-da47-4c0b-be2d-125e128e56a2'),
          ('1e485a2e-1072-49e6-bc7b-4ab1afebd9ac', 'b2e1f623-efbb-49a6-a4c2-9cacfe304c7f'),
          ('1e485a2e-1072-49e6-bc7b-4ab1afebd9ac', '3877a170-ea81-4b42-b16e-5260cc32a752'),
          ('1e485a2e-1072-49e6-bc7b-4ab1afebd9ac', 'adaeb691-dc87-4238-bd20-d2180a9d7487'),
          ('1e485a2e-1072-49e6-bc7b-4ab1afebd9ac', '53416e33-e949-4beb-ba55-26bcecec8a7e'),
          ('1efaa1cf-3a03-4bb5-a067-1bfb6de3d268', '53416e33-e949-4beb-ba55-26bcecec8a7e'),
          ('1efaa1cf-3a03-4bb5-a067-1bfb6de3d268', 'b2e1f623-efbb-49a6-a4c2-9cacfe304c7f'),
          ('1efaa1cf-3a03-4bb5-a067-1bfb6de3d268', '3877a170-ea81-4b42-b16e-5260cc32a752'),
          ('1efaa1cf-3a03-4bb5-a067-1bfb6de3d268', 'adaeb691-dc87-4238-bd20-d2180a9d7487'),
          ('1efaa1cf-3a03-4bb5-a067-1bfb6de3d268', '517ea77e-da47-4c0b-be2d-125e128e56a2'),
          ('9d53978b-46f7-486b-bd5d-7c14670d179d', '53416e33-e949-4beb-ba55-26bcecec8a7e'),
          ('9d53978b-46f7-486b-bd5d-7c14670d179d', 'b2e1f623-efbb-49a6-a4c2-9cacfe304c7f'),
          ('9d53978b-46f7-486b-bd5d-7c14670d179d', '3877a170-ea81-4b42-b16e-5260cc32a752'),
          ('9d53978b-46f7-486b-bd5d-7c14670d179d', 'adaeb691-dc87-4238-bd20-d2180a9d7487'),
          ('9d53978b-46f7-486b-bd5d-7c14670d179d', '517ea77e-da47-4c0b-be2d-125e128e56a2');
      `);

    // Вставка данных в таблицу projects_likes
    await queryRunner.query(`
        INSERT INTO public.projects_likes ("projectId", "profileId") VALUES
          ('b352399d-1500-45ed-9cd6-85df91d450f4', '87e8dda6-103c-40aa-8a81-313d913b3fdd'),
          ('6767df6b-377c-4635-b65d-bc03bde633bd', '87e8dda6-103c-40aa-8a81-313d913b3fdd'),
          ('9a09cdac-5c6c-4de8-ab5a-81fc2af52490', '3698ca08-1e3c-4dd4-9326-6cacef5138ae'),
          ('94c8be72-1dd4-416c-92b8-ab652ea35452', '3698ca08-1e3c-4dd4-9326-6cacef5138ae'),
          ('57c62726-8fa2-436e-b26e-802f93d15614', '3698ca08-1e3c-4dd4-9326-6cacef5138ae'),
          ('abe12d0a-14ae-4f31-8a16-3010b169b975', '3698ca08-1e3c-4dd4-9326-6cacef5138ae'),
          ('94c8be72-1dd4-416c-92b8-ab652ea35452', '530e9433-081a-47b0-9c99-bca2577f3709'),
          ('6767df6b-377c-4635-b65d-bc03bde633bd', '530e9433-081a-47b0-9c99-bca2577f3709'),
          ('9a09cdac-5c6c-4de8-ab5a-81fc2af52490', '530e9433-081a-47b0-9c99-bca2577f3709'),
          ('b352399d-1500-45ed-9cd6-85df91d450f4', '530e9433-081a-47b0-9c99-bca2577f3709'),
          ('4fa047e9-4114-4651-a24e-6a78328d154f', '530e9433-081a-47b0-9c99-bca2577f3709'),
          ('4fa047e9-4114-4651-a24e-6a78328d154f', '93cf273b-6820-4045-92b5-3b5c9e621a22'),
          ('445da3a2-4edd-4fab-8e9e-be506740778e', '530e9433-081a-47b0-9c99-bca2577f3709'),
          ('be01c3ea-5526-4c8c-ba79-e37e6d575b9a', '530e9433-081a-47b0-9c99-bca2577f3709');
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Удаление данных из таблиц (по мере необходимости)
    await queryRunner.query('DELETE FROM public.profiles');
    await queryRunner.query('DELETE FROM public.tags');
    await queryRunner.query('DELETE FROM public.profiles_skills_tags');
    await queryRunner.query('DELETE FROM public.projects');
    await queryRunner.query('DELETE FROM public.project_tags');
  }
}
