import { createClient } from 'contentful';
import { useState, useEffect } from 'react';

const client = createClient({
  space: 'xcw3nx1h79iv',
  environment: 'master', // defaults to 'master' if not set
  accessToken: import.meta.env.VITE_API_KEY,
});

export const useFetchProjects = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState(false);

  const getData = async () => {
    try {
      const response = await client.getEntries({ content_type: 'projects' });
      const projects = response.items.map((project) => {
        const id = project.sys.id;
        const { title, url, image } = project.fields;
        const img = image?.fields?.file?.url;
        return { title, url, id, img };
      });
      setProjects(projects);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { loading, projects };
};
