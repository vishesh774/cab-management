const Cab = require("../database/models/cab");
const CabStatus = require("../database/models/cab-state");
const findCabByKeyName = require("../database/queries/cab");

const DEFAULT_CAB_STATE = 'IDLE';

function createMachine(stateMachineDefinition) {
    const machine = {
      value: stateMachineDefinition.initialState,
      cabId: stateMachineDefinition.cabId,
      city: stateMachineDefinition.city,
      transition(currentState, event) {
        const currentStateDefinition = stateMachineDefinition[currentState]
        const destinationTransition = currentStateDefinition.transitions[event]
        if (!destinationTransition) {
          return
        }
        const destinationState = destinationTransition.target
        const destinationStateDefinition =
          stateMachineDefinition[destinationState]
  
        destinationTransition.action(stateMachineDefinition.cabId, stateMachineDefinition.city)
        currentStateDefinition.actions.onExit(stateMachineDefinition.cabId, stateMachineDefinition.city)
        destinationStateDefinition.actions.onEnter(stateMachineDefinition.cabId, stateMachineDefinition.city)
  
        machine.value = destinationState
        return machine.value
      },
    }
    return machine
}

const cabStatusMachineOptions = {
    'IDLE': {
        actions: {
            onEnter(cabId) {
                console.log('going to cab empty state')
                console.log(cabId)
            },
            onExit(cabId) {
                console.log('going for a trip to be assigned')
                console.log(cabId)
            }
        },
        transitions: {
            switch: {
                target: 'ON_TRIP',
                action(Cab_Id) {
                    const newCabStatus = new CabStatus({
                        Cab_Id,
                        status: 'ON_TRIP'
                    })
                    newCabStatus.save();
                }
            }
        }
    },
    'ON_TRIP': {
        actions: {
            onEnter(cabId) {
                console.log('trip about to be started');
                console.log(cabId)
            },
            onExit(cabId) {
                console.log('trip about to be ended')
                console.log(cabId)
            }
        },
        transitions: {
            switch: {
                target: 'IDLE',
                action(Cab_Id, City_Id) {
                    const newCabStatus = new CabStatus({
                        Cab_Id,
                        City_Id,
                        status: 'IDLE'
                    })
                    newCabStatus.save();
                    // update the xity Id under the cab collection
                    const newCabCity = new Cab({
                        Cab_Id,
                        City_Id
                    }, {
                        upsert: true
                    })
                    newCabCity.save();
                }
            }
        }
    }
};
function createCabStatusMachine(initialState, cabId, city) {
    return createMachine({
        initialState,
        cabId,
        city,
        ...cabStatusMachineOptions
    })
}



module.exports = {
    DEFAULT_CAB_STATE,
    createCabStatusMachine
}