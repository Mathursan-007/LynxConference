const Express = require('express');
const cors = require('cors');

const AdminRoutes = require('../back-end/routes/admin.router');
const EditorRoutes = require('../back-end/routes/user.router');
const ReviewerRoutes = require('../back-end/routes/reviewer.router');
const UserRoutes = require('../back-end/routes/user.router');


require('./dal/connection');

const app = new Express();
app.use(cors());
app.use(Express.json());

app.use("/admin",AdminRoutes);


app.listen(5000, err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Backend Service is running on port 5000...');
});

