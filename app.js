function showDashboard(username) {
    app.innerHTML = `
      <h2>Welcome, ${username}!</h2>
      <div id="teamSection">
        <h3>Your Team</h3>
        <div id="currentTeam">
          <!-- Display team info if available -->
        </div>
        <button id="createTeamBtn">Create Team</button>
        <button id="inviteBtn">Invite Players</button>
        <button id="joinQueueBtn">Join Queue</button>
      </div>
      <button id="logoutBtn">Log Out</button>
    `;
  
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      showLoginForm();
    });
  
    // Team creation event
    document.getElementById("createTeamBtn").addEventListener("click", showTeamCreationForm);
    
    // Invite players event
    document.getElementById("inviteBtn").addEventListener("click", showInviteForm);
  
    // Join queue event
    document.getElementById("joinQueueBtn").addEventListener("click", joinCourtQueue);
  
    // Optionally, load any existing team data from localStorage
    loadTeam(username);
  }

  function showTeamCreationForm() {
    app.innerHTML = `
      <h2>Create Your Team</h2>
      <form id="teamForm">
        <input type="text" id="teamName" placeholder="Team Name" required /><br>
        <button type="submit">Create Team</button>
      </form>
      <button id="backBtn">Back to Dashboard</button>
    `;
  
    document.getElementById("teamForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const teamName = document.getElementById("teamName").value.trim();
      if (teamName) {
        // Save team info in localStorage (for demo purposes)
        let users = JSON.parse(localStorage.getItem("users")) || {};
        const currentUser = localStorage.getItem("currentUser");
        users[currentUser].team = { name: teamName, members: [currentUser] };
        localStorage.setItem("users", JSON.stringify(users));
        alert(`Team "${teamName}" created!`);
        showDashboard(currentUser);
      }
    });
  
    document.getElementById("backBtn").addEventListener("click", () => {
      showDashboard(localStorage.getItem("currentUser"));
    });
  }
  
  function loadTeam(username) {
    let users = JSON.parse(localStorage.getItem("users")) || {};
    const user = users[username];
    if (user && user.team) {
      document.getElementById("currentTeam").innerHTML = `
        <p>Team Name: ${user.team.name}</p>
        <p>Members: ${user.team.members.join(", ")}</p>
      `;
    } else {
      document.getElementById("currentTeam").innerHTML = `<p>No team created yet.</p>`;
    }
  }
  function showInviteForm() {
    const currentUser = localStorage.getItem("currentUser");
    let users = JSON.parse(localStorage.getItem("users")) || {};
    // Ensure the user has a team first
    if (!users[currentUser].team) {
      alert("Please create a team first.");
      return showTeamCreationForm();
    }
  
    app.innerHTML = `
      <h2>Invite a Player</h2>
      <form id="inviteForm">
        <input type="text" id="inviteUsername" placeholder="Player Username" required /><br>
        <button type="submit">Send Invite</button>
      </form>
      <button id="backBtn">Back to Dashboard</button>
    `;
  
    document.getElementById("inviteForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const inviteUsername = document.getElementById("inviteUsername").value.trim();
      // Check if invited user exists
      if (users[inviteUsername]) {
        // Simulate sending an invite by adding directly (in a real app, you'd use notifications)
        users[currentUser].team.members.push(inviteUsername);
        localStorage.setItem("users", JSON.stringify(users));
        alert(`Invite sent to ${inviteUsername} (added to your team)!`);
        showDashboard(currentUser);
      } else {
        alert("User not found.");
      }
    });
  
    document.getElementById("backBtn").addEventListener("click", () => {
      showDashboard(currentUser);
    });
  }
    