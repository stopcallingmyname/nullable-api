import { MigrationInterface, QueryRunner } from 'typeorm';

export class Data1722373625784 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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

    // Вставка данных в таблицу projects
    await queryRunner.query(`
        INSERT INTO public.projects (id, name, description, created_at, updated_at, profile_id) VALUES
          ('1e485a2e-1072-49e6-bc7b-4ab1afebd9ac', 'Some project', 'Some description', '2024-06-04 16:48:17.299715', '2024-06-04 16:48:17.299715', '93cf273b-6820-4045-92b5-3b5c9e621a22'),
          ('1efaa1cf-3a03-4bb5-a067-1bfb6de3d268', 'New project', 'New description', '2024-06-06 15:55:33.346785', '2024-06-06 15:55:33.346785', '530e9433-081a-47b0-9c99-bca2577f3709'),
          ('9d53978b-46f7-486b-bd5d-7c14670d179d', 'Old project', 'Old description', '2024-06-12 18:08:53.721633', '2024-06-12 18:08:53.721633', 'f10ab340-19ca-4d6b-81e7-562ef240995c');
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
