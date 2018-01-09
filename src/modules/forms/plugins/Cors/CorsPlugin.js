import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import SETUP from '../setup.config';
import block from '../../../../helpers/bem-cn';
import optionsTransformer from '../../../../helpers/optionsTransformer';
import getValues from '../../../../helpers/getValues';

import Row from '../../../Layout/Row/Row';
import Label from '../../../../components/Label/Label';
import Input from '../../../inputs/Input';
import Hint from '../../../../components/Hint/Hint';
import ControlBar from '../ControlBar/ControlBar';
import MultiSelect from '../../../selects/MultiSelect/MultiSelect';
import TagSelect from '../../../selects/TagSelect/TagSelect';
import Control from '../../../../components/Control/Control';

const propTypes = {
    apiSchema: PropTypes.object.isRequired,
    className: PropTypes.string,
    edit: PropTypes.bool,
    name: PropTypes.string.isRequired,
    plugin: PropTypes.object.isRequired,
    pluginFromValues: PropTypes.object.isRequired,
    pluginName: PropTypes.string.isRequired,
    handlePluginExclude: PropTypes.func.isRequired,
};

class CorsPlugin extends PureComponent {
    componentDidMount = () => {
        this.setState({});
    }

    copyToClipboard = () => {
        const fakeInput = document.createElement('textarea');

        fakeInput.setAttribute('id', 'fakeInput');
        fakeInput.value = getValues(['config', 'request_headers'])(this.props.pluginFromValues);
        document.body.appendChild(fakeInput);
        fakeInput.select();
        document.execCommand('copy');
        document.body.removeChild(fakeInput);
    }

    render() {
        const { apiSchema, className, edit, name, handlePluginExclude, plugin, pluginName } = this.props;
        const b = block(className);
        const allValues = key => apiSchema.plugins[0].config[key];

        return (
            <div className={b('section')()}>
                <Row fullwidth>
                    <Row col>
                        <Label>Plugin Name</Label>
                        <Input input={{value: 'CORS'}} disabled />
                    </Row>
                    <ControlBar name={`${name}.enabled`} removePlugin={() => handlePluginExclude(pluginName)} />
                </Row>
                <Row className={b('row')()} fullwidth>
                    <Row col>
                        <Label>Domains</Label>
                        <Field
                            name={`${name}.config.domains`}
                            type="text"
                            edit={edit}
                            placeholder={SETUP.placeholders.cors.domains}
                            value={() => getValues(['config', 'domains'])(plugin)}
                            options={optionsTransformer(allValues('domains'))}
                            component={TagSelect}
                        />
                        <Hint>A list of all domains from which the endpoint will accept requests.</Hint>
                    </Row>
                    <Row col>
                        <Label>Methods</Label>
                        <Field
                            name={`${name}.config.methods`}
                            type="text"
                            edit={edit}
                            placeholder={SETUP.placeholders.cors.methods}
                            value={() => getValues(['config', 'methods'])(plugin)}
                            options={optionsTransformer(allValues('methods'))}
                            component={MultiSelect}
                        />
                        <Hint>HTTP methods that are supported for the endpoint.</Hint>
                    </Row>
                </Row>
                <Row className={b('row')()} fullwidth>
                    <Row col>
                        <Label>Request Headers</Label>
                        <Control
                            icon="copy"
                            onClick={this.copyToClipboard}
                        />
                        <Field
                            name={`${name}.config.request_headers`}
                            type="text"
                            edit={edit}
                            value={() => getValues(['config', 'request_headers'])(plugin)}
                            placeholder={SETUP.placeholders.cors.request_headers}
                            options={optionsTransformer(allValues('request_headers'))}
                            component={TagSelect}
                        />
                        <Hint>Value(s) for the Access-Control-Allow-Headers header.</Hint>
                    </Row>
                    <Row col>
                        <Label>Exposed Headers</Label>
                        <Field
                            name={`${name}.config.exposed_headers`}
                            type="text"
                            edit={edit}
                            value={() => getValues(['config', 'exposed_headers'])(plugin)}
                            placeholder={SETUP.placeholders.cors.request_headers}
                            options={optionsTransformer(allValues('exposed_headers'))}
                            component={TagSelect}
                        />
                        <Hint>Value for the Access-Control-Expose-Headers header.</Hint>
                    </Row>
                </Row>
            </div>
        );
    };
};

CorsPlugin.propTypes = propTypes;

export default CorsPlugin;
