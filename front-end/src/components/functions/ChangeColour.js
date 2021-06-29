const statusColor = status => {
    if(status == 'pending') {
        return "bg-warning";
    } else if(status == 'rejected') {
        return "bg-danger";
    } else if(status == 'approved') {
        return "bg-success";
    }
}

module.exports = statusColor;
