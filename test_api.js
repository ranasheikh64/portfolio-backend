const fs = require('fs');
const FormData = require('form-data');

async function runTests() {
  const baseUrl = 'http://localhost:5000/api/projects';
  let createdProjectId;

  console.log('--- TESTING API ---');

  // 1. POST /api/projects
  console.log('\n1. Creating a new project (POST /api/projects)...');
  const form = new FormData();
  form.append('name', 'Test Portfolio Project');
  form.append('details', 'This is a dummy project created via test script.');
  form.append('liveLink', 'https://example.com');
  form.append('github', 'https://github.com/example/repo');
  
  const imagePath = 'e:/rana project/my_portfolio_backend/ChatGPT Image Jul 14, 2026, 08_44_36 PM.png';
  if (fs.existsSync(imagePath)) {
    form.append('images', fs.createReadStream(imagePath));
  } else {
    console.log('Error: Image not found at path');
    return;
  }

  try {
    const fetch = (await import('node-fetch')).default;
    let postResponse = await fetch(baseUrl, {
      method: 'POST',
      body: form,
      headers: form.getHeaders()
    });
    
    let postData = await postResponse.json();
    console.log('Response Status:', postResponse.status);
    console.log('Response Body:', JSON.stringify(postData, null, 2));
    createdProjectId = postData._id;

    if (!createdProjectId) {
      console.log('Failed to create project, aborting remaining tests.');
      return;
    }

    // 2. GET /api/projects
    console.log('\n2. Getting all projects (GET /api/projects)...');
    let getListResponse = await fetch(baseUrl);
    let getListData = await getListResponse.json();
    console.log('Response Status:', getListResponse.status);
    console.log('Response Body:', JSON.stringify(getListData, null, 2));

    // 3. GET /api/projects/:id
    console.log(`\n3. Getting single project (GET /api/projects/${createdProjectId})...`);
    let getSingleResponse = await fetch(`${baseUrl}/${createdProjectId}`);
    let getSingleData = await getSingleResponse.json();
    console.log('Response Status:', getSingleResponse.status);
    console.log('Response Body:', JSON.stringify(getSingleData, null, 2));

    // 4. PUT /api/projects/:id
    console.log(`\n4. Updating project (PUT /api/projects/${createdProjectId})...`);
    const updateForm = new FormData();
    updateForm.append('name', 'Updated Test Project');
    let putResponse = await fetch(`${baseUrl}/${createdProjectId}`, {
      method: 'PUT',
      body: updateForm,
      headers: updateForm.getHeaders()
    });
    let putData = await putResponse.json();
    console.log('Response Status:', putResponse.status);
    console.log('Response Body:', JSON.stringify(putData, null, 2));

    // 5. DELETE /api/projects/:id
    // Instead of deleting, I will leave it so user can see it in DB. 
    // I'll just print that we skip it.
    console.log(`\n5. Skipping DELETE /api/projects/${createdProjectId} so you can verify it in DB.`);
    
    fs.writeFileSync('test_results.json', JSON.stringify({
      POST: postData,
      GET_ALL: getListData,
      GET_SINGLE: getSingleData,
      PUT: putData
    }, null, 2));
    console.log('\nSaved responses to test_results.json');

  } catch (error) {
    console.error('Error during testing:', error.message);
  }
}

runTests();
