import { useEffect, useState } from "react";
import api from "../api/api";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [search, projects]);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      const projectData = res.data;

      // Fetch modules for each project
      const projectsWithModules = await Promise.all(
        projectData.map(async (project) => {
          const modulesRes = await api.get(
            `/projects/${project.projectId}/modules`
          );

          return {
            ...project,
            modules: modulesRes.data,
          };
        })
      );

      setProjects(projectsWithModules);
      setFilteredProjects(projectsWithModules);
    } catch (error) {
      console.error("Error fetching projects", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!search) {
      setFilteredProjects(projects);
      return;
    }

    const lowerSearch = search.toLowerCase();

    const filtered = projects.filter((project) => {
      const matchProject =
        project.projectName?.toLowerCase().includes(lowerSearch) ||
        project.description?.toLowerCase().includes(lowerSearch) ||
        project.status?.toLowerCase().includes(lowerSearch);

      const matchModule =
        project.modules?.some((module) =>
          module.name?.toLowerCase().includes(lowerSearch)
        );

      return matchProject || matchModule;
    });

    setFilteredProjects(filtered);
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg font-semibold">
        Loading projects...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white shadow-xl rounded-2xl p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Project List
          </h1>

          <input
            type="text"
            placeholder="Search project or module..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No projects found.
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.projectId}
              className="border rounded-xl p-6 shadow hover:shadow-lg transition bg-white"
            >
              {/* Project Info */}
              <div className="mb-4">
                <h2 className="text-xl font-bold text-blue-600">
                  {project.projectName}
                </h2>

                <p className="text-gray-600 mt-1">
                  {project.description}
                </p>

                <div className="mt-3 text-sm text-gray-700 space-y-1">
                  <p>
                    <span className="font-semibold">Start:</span>{" "}
                    {project.startDate}
                  </p>
                  <p>
                    <span className="font-semibold">End:</span>{" "}
                    {project.endDate}
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        project.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {project.status}
                    </span>
                  </p>
                </div>
              </div>

              {/* Modules Section */}
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Modules
                </h3>

                {project.modules && project.modules.length > 0 ? (
                  <ul className="space-y-2">
                    {project.modules.map((module) => (
                      <li
                        key={module.id}
                        className="bg-gray-50 p-3 rounded-lg border"
                      >
                        <p className="font-medium text-gray-800">
                          {module.name}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 text-sm">
                    No modules added.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
