export default function logger({ getState }) {
    return next => action => {
        console.group('Action:', action.type)  // eslint-disable-line no-console
        console.log('will dispatch', action)  // eslint-disable-line no-console
        const result = next(action)
        console.log('state after dispatch', getState())  // eslint-disable-line no-console
        console.groupEnd()  // eslint-disable-line no-console

        return result
    }
}
