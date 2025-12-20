const workspaces = new Set();

function generateWorkspaceCode() {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  const random = (length) =>
    Array.from(
      { length },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("");

  return `${random(3)}-${random(4)}-${random(3)}`;
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

    if (workspaces.has(code)) {
      res
        .status(200)
        .json({ message: `Workspace ${code} exist`, exists: true });
    } else {
      res.status(200).json({
        exists: false,
        message: "Workspace does not exist",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong on the server" });
  }
};
