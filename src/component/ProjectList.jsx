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

   
      const projectsWithModules = await Promise.all(
        projectData.map(async (project) => {
          try {
            const modulesRes = await api.get(
              `/projects/${project.projectId}/modules`
            );

            const modulesWithEmployees = await Promise.all(
              modulesRes.data.map(async (module) => {
                if (module.employeeId) {
                  try {
                    const employeeRes = await api.get(
                      `/admin/employees/${module.employeeId}`
                    );
                    return {
                      ...module,
                      employee: employeeRes.data,
                    };
                  } catch (error) {
                    console.error(
                      `Error fetching employee ${module.employeeId}:`,
                      error
                    );
                    return module;
                  }
                }
                return module;
              })
            );

            return {
              ...project,
              modules: modulesWithEmployees,
            };
          } catch (error) {
            console.error(
              `Error fetching modules for project ${project.projectId}:`,
              error
            );
            return {
              ...project,
              modules: [],
            };
          }
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

      const matchModule = project.modules?.some(
        (module) =>
          module.name?.toLowerCase().includes(lowerSearch) ||
          module.description?.toLowerCase().includes(lowerSearch) ||
          module.employee?.name?.toLowerCase().includes(lowerSearch)
      );

      return matchProject || matchModule;
    });

    setFilteredProjects(filtered);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg font-semibold text-gray-700">
            Loading projects...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white shadow-xl rounded-2xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Project Management
            </h1>
            <p className="text-gray-600 mt-1">
              {filteredProjects.length} project
              {filteredProjects.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <input
            type="text"
            placeholder="Search project, module, or employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="mt-4 text-lg text-gray-500">No projects found.</p>
            {search && (
              <p className="text-sm text-gray-400 mt-2">
                Try adjusting your search terms
              </p>
            )}
          </div>
        )}

       
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.projectId}
              className="border rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-200 bg-white"
            >
            
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-blue-600 mb-2">
                    {project.projectName}
                  </h2>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <span
                  className={`ml-4 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                    project.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : project.status === "COMPLETED"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              {/* Project Timeline */}
              <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase">
                    Start Date
                  </p>
                  <p className="text-sm font-medium text-gray-800 mt-1">
                    {project.startDate || "Not set"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase">
                    End Date
                  </p>
                  <p className="text-sm font-medium text-gray-800 mt-1">
                    {project.endDate || "Not set"}
                  </p>
                </div>
              </div>

              {/* Modules Section */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    Modules
                  </h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {project.modules?.length || 0}
                  </span>
                </div>

                {project.modules && project.modules.length > 0 ? (
                  <div className="space-y-3">
                    {project.modules.map((module) => (
                      <div
                        key={module.id}
                        className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-all"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 mb-1">
                              {module.name}
                            </h4>

                            {module.description && (
                              <p className="text-sm text-gray-600 mb-2">
                                {module.description}
                              </p>
                            )}

                            {/* Employee Info */}
                            {module.employee ? (
                              <div className="flex items-center mt-2 text-sm">
                                <div className="flex items-center bg-white px-3 py-1.5 rounded-full border border-gray-200">
                                  <svg
                                    className="w-4 h-4 text-blue-600 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                  </svg>
                                  <span className="font-medium text-gray-700">
                                    {module.employee.name}
                                  </span>
                                  {module.employee.designation?.title && (
                                    <span className="ml-2 text-gray-500">
                                      • {module.employee.designation.title}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center mt-2 text-sm">
                                <span className="text-gray-400 italic">
                                  No employee assigned
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                    <svg
                      className="mx-auto h-10 w-10 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                    <p className="text-gray-500 text-sm mt-2">
                      No modules added yet
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectList