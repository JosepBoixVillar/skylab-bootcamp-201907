import logic from '..'

describe('logic - is user logged out', () => {
    beforeEach(async () => {
        logic.__token__ = 'ey123'
    })

    it('should succeed on correct data', async () => {
        logic.logUserOut()
        
        expect(logic.__token__).toBeUndefined()
    })
})