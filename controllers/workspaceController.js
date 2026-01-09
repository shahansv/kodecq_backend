const workspaces = new Set();

function generateWorkspaceCode() {
  const chars = "abcdefghijklmnopqrstuvwxyz";

  function random(length) {
    let result = "";

    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * chars.length);
      result += chars[index];
    }
    return result;
  }
  return random(3) + "-" + random(4) + "-" + random(3);
}

function getUniqueWorkspaceCode() {
  const code = generateWorkspaceCode();

  if (workspaces.has(code)) {
    return getUniqueWorkspaceCode();
  }
  return code;
}

exports.createWorkspace = (req, res) => {
  try {
    const code = getUniqueWorkspaceCode();
    workspaces.add(code);
    res
      .status(201)
      .json({ message: "Workspace code generated successfully", code });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong on the server" });
  }
};

exports.checkWorkspaceExist = (req, res) => {
  try {
    const { code } = req.params;

    if (code) {
      if (workspaces.has(code)) {
        res
          .status(200)
          .json({ message: `Workspace ${code} exist`, exists: true });
      } else {
        res.status(400).json({
          exists: false,
          message: "Workspace does not exist",
        });
      }
    } else {
      return res.status(400).json({ message: "workspace code is required" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong on the server" });
  }
};
