import { useEffect, useState } from "react";
import api from "../api/api"; // your axios instance

const MyProjectDetails = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjectDetails();
  }, []);

  const fetchProjectDetails = async () => {
    try {
      const res = await api.get("/employees"); 
      setData(res.data);
    } catch (error) {
      console.error("Error fetching project details", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading project details...</div>;
  }

  if (!data || !data.project) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No project assigned yet.
      </div>
    );
  }

  const { project } = data;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          My Project Details
        </h1>

        {/* Project Info */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {project.projectName}
          </h2>

          <p className="text-gray-600 mb-2">
            {project.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <span className="font-semibold">Start Date:</span> {project.startDate}
            </div>
            <div>
              <span className="font-semibold">End Date:</span> {project.endDate}
            </div>
            <div>
              <span className="font-semibold">Technologies:</span> {project.technologies}
            </div>
          </div>
        </div>

        {/* Modules Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            My Modules
          </h2>

          {project.modules && project.modules.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {project.modules.map((module) => (
                <div
                  key={module.id}
                  className="border rounded-xl p-5 shadow hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-bold text-blue-600">
                    {module.moduleName}
                  </h3>

                  <p className="text-gray-600 mt-2">
                    {module.description}
                  </p>

                  <div className="mt-3 text-sm text-gray-700">
                    <p>
                      <span className="font-semibold">Deadline:</span>{" "}
                      {module.endDate}
                    </p>

                    <p>
                      <span className="font-semibold">Status:</span>{" "}
                      {module.status}
                    </p>

                    <p>
                      <span className="font-semibold">Technology:</span>{" "}
                      {module.technology}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No modules assigned.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProjectDetails;
