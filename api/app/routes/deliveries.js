module.exports = (app) => {

    const deliveries = app.controllers.deliveries

    app.route('/api/deliveries')
    .get( deliveries.get )
    .post( deliveries.save )

    app.route('/api/deliveries/:id')
    .delete( deliveries.delete )

}
