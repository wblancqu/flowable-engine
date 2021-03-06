/* Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
'use strict';

/* App Module */

var activitiAdminApp = angular.module('activitiAdminApp', ['ngResource', 'ngRoute', 'ngCookies',
    'pascalprecht.translate', 'ngGrid', 'ui.select2', 'ui.bootstrap', 'angularFileUpload', 'ui.keypress',
    'ui.grid', 'ui.grid.edit', 'ui.grid.selection', 'ui.grid.autoResize', 'ui.grid.moveColumns', 'ui.grid.cellNav']);

activitiAdminApp
    .config(['$routeProvider', '$httpProvider', '$translateProvider', '$provide',
        function ($routeProvider, $httpProvider, $translateProvider, $provide) {
            $routeProvider
            	.when('/login', {
            		templateUrl: 'views/login.html',
            		controller: 'LoginController'
            	})
                .when('/process-definitions', {
                    templateUrl: 'views/process-definitions.html',
                    controller: 'ProcessDefinitionsController',
                    reloadOnSearch: true
                })
                .when('/process-definition/:definitionId', {
                    templateUrl: 'views/process-definition.html',
                    controller: 'ProcessDefinitionController',
                    reloadOnSearch: true
                })
                .when('/deployments', {
                    templateUrl: 'views/deployments.html',
                    controller: 'DeploymentsController',
                    reloadOnSearch: true
                })
                .when('/deployment/:deploymentId', {
                    templateUrl: 'views/deployment.html',
                    controller: 'DeploymentController',
                    reloadOnSearch: true
                })
                .when('/process-instances', {
                    templateUrl: 'views/process-instances.html',
                    controller: 'ProcessInstancesController',
                    reloadOnSearch: true
                })
                .when('/process-instance/:processInstanceId', {
                	templateUrl: 'views/process-instance.html',
                	controller: 'ProcessInstanceController',
                  	reloadOnSearch: true
                })
                .when('/tasks', {
                	templateUrl: 'views/tasks.html',
                	controller: 'TasksController',
                 	reloadOnSearch: true
                })
                .when('/task/:taskId', {
                	templateUrl: 'views/task.html',
                	controller: 'TaskController',
                  	reloadOnSearch: true
                })
                .when('/jobs', {
                	templateUrl: 'views/jobs.html',
                	controller: 'JobsController',
                  	reloadOnSearch: true
                })
                .when('/job/:jobId', {
                	templateUrl: 'views/job.html',
                	controller: 'JobController',
                  	reloadOnSearch: true
                })
                .when('/users', {
                	templateUrl: 'views/users.html',
                	controller: 'UsersController',
                  	reloadOnSearch: true
                })
                .when('/engine', {
                    templateUrl: 'views/engine.html',
                    controller: 'EngineController',
                    reloadOnSearch: true
                })
                .when('/monitoring', {
                    templateUrl: 'views/monitoring.html',
                    controller: 'MonitoringController',
                    reloadOnSearch: true
                })
                .when('/logout', {
              		templateUrl: 'views/login.html',
              		controller: 'LogoutController',
                  	reloadOnSearch: true
              	})
              	.when('/', {
              	  	redirectTo: '/engine'
                })
              	.when('/process-definitions-refresh', {
              		redirectTo: '/process-definitions'
              	})
                .when('/apps', {
                    templateUrl: 'views/app-deployments.html',
                    controller: 'AppDeploymentsController',
                    reloadOnSearch: true
                })
                .when('/app/:appId', {
                    templateUrl: 'views/app-deployment.html',
                    controller: 'AppDeploymentController',
                    reloadOnSearch: true
                })
                .when('/decision-tables', {
                    templateUrl: 'views/decision-tables.html',
                    controller: 'DecisionTablesController',
                    reloadOnSearch: true
                })
                .when('/decision-table/:decisionTableId', {
                    templateUrl: 'views/decision-table.html',
                    controller: 'DecisionTableController',
                    reloadOnSearch: true
                })
                .when('/forms', {
                    templateUrl: 'views/forms.html',
                    controller: 'FormsController',
                    reloadOnSearch: true
                })
                .when('/form/:formId', {
                    templateUrl: 'views/form.html',
                    controller: 'FormController',
                    reloadOnSearch: true
                })
                .when('/submitted-form/:submittedFormId', {
                    templateUrl: 'views/submitted-form.html',
                    controller: 'SubmittedFormController',
                    reloadOnSearch: true
                })
                .otherwise({
                	templateUrl: 'views/login.html',
                    controller: 'LoginController',
                    reloadOnSearch: true
                });

            // Initialize angular-translate
            $translateProvider.useStaticFilesLoader({
                prefix: './i18n/',
                suffix: '.json'
            });

            $translateProvider.registerAvailableLanguageKeys(['en', 'de', 'es', 'fr', 'it', 'nl', 'ja'], {
                'en_*': 'en',
                'de_*': 'de',
                'es_*': 'es',
                'fr_*': 'fr',
                'it_*': 'it',
                'en-*': 'en',
                'de-*': 'de',
                'es-*': 'es',
                'fr-*': 'fr',
                'it-*': 'it',
                'nl-*': 'nl',
                'ja-*': 'ja'
            }).determinePreferredLanguage();

        }])

    // Custom Http interceptor that adds the correct prefix to each url
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push(function ($q) {
            return {
                'request': function (config) {

                    // Check if it starts with /app, if so add ., such that it works with a context root
                    if (config.url && config.url.indexOf('/app') === 0) {
                        config.url = '.' + config.url;
                    } else  if (config.url && config.url.indexOf('app') === 0) {
                        config.url = './' + config.url;
                    }

                    return config || $q.when(config);
                }
            };
        });
    }])

    /* Filters */

    .filter('dateformat', function() {
		    return function(date, format) {
		    	if(date) {
		    		if(format == ('full')) {
		    			// Format the given value
		    			return moment(date).format("LLL");
		    		} else {
		    			// By default, return a pretty date, based on the current time
		    			return moment(date).format("lll");
		    		}
		    	}
		    	return '';
		    };
		})
		.filter('empty', function() {
		    return function(value) {
		    	if(value) {
		    		return value;
		    	}
		    	return '(None)';
		    };
		})
        .filter('humanTime', function() {
            return function(milliseconds){
                var seconds = milliseconds / 1000;
                var numyears = Math.floor(seconds / 31536000);
                var numdays = Math.floor((seconds % 31536000) / 86400);
                var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
                var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
                var numseconds = Math.floor((((seconds % 31536000) % 86400) % 3600) % 60);
                return numyears + " years " +  numdays + " days " + numhours + " hours " + numminutes + " minutes " + numseconds + " seconds";
            };
        })
        .filter('megabytes', function() {
            return function(bytes) {
                 return Math.floor((bytes/1048576)) + 'MB';
            };
        })
        .filter('round', function() {
        	return function(number) {
        		if(!number) {
        			return "0";
        		} else {
        			return +number.toFixed(3);
        		}
        	};
        })
        .filter('range', function() {
          return function(input, min, max) {
            min = parseInt(min); //Make string input int
            max = parseInt(max);
            for (var i=min; i<max; i++)
              input.push(i);
            return input;
          };
        })
        .run(['$rootScope', '$http', '$timeout', '$location', '$cookies', '$modal', '$translate',
            function($rootScope, $http, $timeout, $location, $cookies, $modal, $translate) {

                $rootScope.serverStatus = {
                };

                $translate.use('en');

        		$rootScope.serversLoaded = false;
        		
        		$rootScope.loadServerConfig = function(callbackAfterLoad) {
                    $http({method: 'GET', url: '/app/rest/server-configs'}).
                    success(function(data) {
                        if (data.length > 0) {

                            $rootScope.activeServers = {};

                            for (var i = 0; i < data.length; i++) {
                                if (data[i].endpointType === 1) {
                                    $rootScope.activeServers['process'] = data[i];
                                } else if (data[i].endpointType === 2) {
                                    $rootScope.activeServers['dmn'] = data[i];
                                } else if (data[i].endpointType === 3) {
                                    $rootScope.activeServers['form'] = data[i];
                                } else {
                                    console.log('Warning! Invalid endpoint type received: '+data[i].endpointType);
                                }
                            }

                            $rootScope.serversLoaded = true;
                        } else {
                            console.log('Warning! No server configurations received');
                        }
                    }).
                    error(function(data, status, headers, config) {
                        console.log('Something went wrong: ' + data);
                    });

                };
        		
        		$http.get('/app/rest/account')
		        	.success(function (data, status, headers, config) {
		              	$rootScope.account = data;
		               	$rootScope.authenticated = true;
		               	$rootScope.loadServerConfig(false);
		          	});

	        	$rootScope.loadProcessDefinitionsCache = function() {
                    var promise = $http({
                        method: 'GET',
                        url: '/app/rest/activiti/process-definitions?size=100000000'
                    }).success(function (data, status, headers, config) {
                        return data;
                    }).error(function (data, status, headers, config) {
                        return {'status': false};
                    });

                    return promise;
	            };

	            $rootScope.getProcessDefinitionFromCache = function(processDefId) {
	            	for (var i = 0; i < $rootScope.processDefinitionsCache.data.length; i++) {
            			if ($rootScope.processDefinitionsCache.data[i].id === processDefId) {
            				return $rootScope.processDefinitionsCache.data[i];
            			}
            		}
	            	return null;
	            };

	            // Reference the fixed configuration values on the root scope
	            $rootScope.config = ActivitiAdmin.Config;

	            // Store empty object for filter-references
	            $rootScope.filters = { forced: {} };

	            // Alerts
	            $rootScope.alerts = {
	                queue: []
	            };

	            $rootScope.showAlert = function(alert) {
	                if (alert.queue.length > 0) {
	                    alert.current = alert.queue.shift();
	                    // Start timout for message-pruning
	                    alert.timeout = $timeout(function() {
	                        if(alert.queue.length == 0) {
	                            alert.current = undefined;
	                            alert.timeout = undefined;
	                        } else {
	                            $rootScope.showAlert(alert);
	                        }
	                    }, 1500);
	                } else {
	                    $rootScope.alerts.current = undefined;
	                }
	            };

	            $rootScope.addAlert = function(message, type) {
	                var newAlert = {message: message, type: type};
                    if (!$rootScope.alerts.timeout) {
                        // Timeout for message queue is not running, start one
                        $rootScope.alerts.queue.push(newAlert);
                        $rootScope.showAlert($rootScope.alerts);
                    } else {
                        $rootScope.alerts.queue.push(newAlert);
                    }
	            };

	            $rootScope.dismissAlert = function() {
	                if (!$rootScope.alerts.timeout) {
	                    $rootScope.alerts.current = undefined;
	                } else {
	                    $timeout.cancel($rootScope.alerts.timeout);
	                    $rootScope.alerts.timeout = undefined;
	                    $rootScope.showAlert($rootScope.alerts);
	                }
	            };

	            $rootScope.addAlertPromise = function(promise, type) {
	                promise.then(function(data) {
	                    $rootScope.addAlert(data, type);
	                });
	            };

	            $rootScope.executeWhenReady = function(callback) {
	                if ($rootScope.activeServers) {
	                    callback();
	                } else {
	                    $rootScope.$watch('activeServers', function() {
	                        if ($rootScope.activeServers) {
	                            callback();
	                        }
	                    });
	                }
	            };
        	}
        ]);

